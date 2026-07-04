import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const PAYPAL_BASE = Deno.env.get("PAYPAL_MODE") === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

const COINS_PER_USD = 20000;

function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeout));
}

async function getAccessToken() {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured");
  }
  const auth = btoa(`${clientId}:${clientSecret}`);
  const res = await fetchWithTimeout(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  }, 10000);
  const data = await res.json();
  if (!data.access_token) {
    throw new Error(data.error_description || data.error || "Failed to get PayPal access token");
  }
  return data.access_token;
}

// Extract error message from any PayPal error response format
function extractPayPalError(data: any): string {
  if (!data) return "Unknown PayPal error";
  if (data.error?.message) return data.error.message;
  if (data.error_description) return data.error_description;
  if (data.message) return data.message;
  if (data.name && data.details?.length > 0) {
    return `${data.name}: ${data.details.map((d: any) => d.description || d.issue).join(", ")}`;
  }
  if (data.name) return data.name;
  return "PayPal API error";
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { coins, paypal_email } = await req.json();
    if (!coins || coins < COINS_PER_USD) {
      return Response.json({ error: `Minimum withdrawal is ${COINS_PER_USD.toLocaleString()} coins ($1)` }, { status: 400 });
    }
    if (!paypal_email || !paypal_email.includes("@")) {
      return Response.json({ error: "Valid PayPal email required" }, { status: 400 });
    }

    // Get user profile + check balance
    const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
    if (profiles.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }
    const profile = profiles[0];

    if ((profile.coins || 0) < coins) {
      return Response.json({ error: "Insufficient coin balance" }, { status: 400 });
    }

    // Calculate USD amount (coins → USD)
    const amountUsd = parseFloat((coins / COINS_PER_USD).toFixed(2));
    if (amountUsd < 1) {
      return Response.json({ error: "Minimum withdrawal amount is $1" }, { status: 400 });
    }

    // Deduct coins immediately (auto-process)
    await base44.asServiceRole.entities.UserProfile.update(profile.id, {
      coins: profile.coins - coins,
    });

    // Create pending withdrawal transaction
    const txn = await base44.asServiceRole.entities.Transaction.create({
      user_id: user.id,
      type: "withdraw",
      amount_usd: amountUsd,
      coins: coins,
      status: "pending",
      paypal_email: paypal_email,
      description: `Withdrawal ${coins.toLocaleString()} coins → $${amountUsd} to ${paypal_email}`,
    });

    // Create PayPal payout
    let token;
    try {
      token = await getAccessToken();
    } catch (e) {
      // Refund coins if token fetch fails
      await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        coins: profile.coins,
      });
      await base44.asServiceRole.entities.Transaction.update(txn.id, {
        status: "failed",
        description: `Failed: ${e.message}`,
      });
      return Response.json({ error: e.message }, { status: 400 });
    }

    const senderBatchId = `withdraw_${txn.id}_${Date.now()}`;

    const payoutRes = await fetchWithTimeout(`${PAYPAL_BASE}/v1/payments/payouts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_batch_header: {
          sender_batch_id: senderBatchId,
          email_subject: "VYRO Live Withdrawal",
          email_message: `You received a withdrawal of $${amountUsd} from VYRO Live.`,
        },
        items: [{
          recipient_type: "EMAIL",
          amount: {
            value: amountUsd.toFixed(2),
            currency: "USD",
          },
          receiver: paypal_email,
          note: `Withdrawal of ${coins.toLocaleString()} VYRO coins`,
          sender_item_id: txn.id,
        }],
      }),
    }, 15000);
    const payoutData = await payoutRes.json();

    if (!payoutRes.ok || payoutData.error || !payoutData.batch_header) {
      // Refund coins on failure
      await base44.asServiceRole.entities.UserProfile.update(profile.id, {
        coins: profile.coins,
      });
      const errMsg = extractPayPalError(payoutData);
      await base44.asServiceRole.entities.Transaction.update(txn.id, {
        status: "failed",
        description: `Failed: ${errMsg}`,
      });
      return Response.json({ error: errMsg }, { status: 400 });
    }

    const payoutBatchId = payoutData.batch_header?.payout_batch_id;
    const payoutStatus = payoutData.batch_header?.batch_status;

    await base44.asServiceRole.entities.Transaction.update(txn.id, {
      status: payoutStatus === "SUCCESS" ? "completed" : "pending",
      paypal_payout_id: payoutBatchId,
    });

    return Response.json({
      success: true,
      amount_usd: amountUsd,
      payout_id: payoutBatchId,
      status: payoutStatus,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});