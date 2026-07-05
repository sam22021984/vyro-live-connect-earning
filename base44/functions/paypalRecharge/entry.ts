import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const PAYPAL_BASE = Deno.env.get("PAYPAL_MODE") === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

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

    const body = await req.json();
    const { action } = body;

    // Action: capture — after user returns from PayPal approval
    if (action === "capture") {
      const { order_id, tier_id, coins, bonus_coins, price, tier_label } = body;
      if (!order_id) {
        return Response.json({ error: "Missing order_id" }, { status: 400 });
      }

      // Look up pending transaction to get stored tier details (fallback if URL params missing)
      const pendingTxns = await base44.asServiceRole.entities.Transaction.filter({
        paypal_order_id: order_id,
        status: "pending",
      });
      const pendingTxn = pendingTxns[0];

      // Use URL params first, fallback to stored transaction data
      const finalTierId = tier_id || pendingTxn?.tier_label || "unknown";
      const finalTierLabel = tier_label || pendingTxn?.tier_label || finalTierId;
      const finalPrice = Number(price ?? pendingTxn?.amount_usd ?? 0);
      const totalCoins = Number(coins ?? pendingTxn?.coins ?? 0) + Number(bonus_coins ?? 0);

      const token = await getAccessToken();

      const captureRes = await fetchWithTimeout(`${PAYPAL_BASE}/v2/checkout/orders/${order_id}/capture`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }, 15000);
      const captureData = await captureRes.json();

      if (captureData.status !== "COMPLETED") {
        return Response.json({ error: extractPayPalError(captureData), details: captureData }, { status: 400 });
      }

      // Credit coins to user profile
      const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length > 0) {
        const p = profiles[0];
        await base44.asServiceRole.entities.UserProfile.update(p.id, {
          coins: (p.coins || 0) + totalCoins,
        });
      }

      // Update existing pending transaction to completed
      if (pendingTxn) {
        await base44.asServiceRole.entities.Transaction.update(pendingTxn.id, {
          status: "completed",
          description: `Recharge ${totalCoins} coins ($${finalPrice})`,
        });
      } else {
        // Fallback: create new transaction record
        await base44.asServiceRole.entities.Transaction.create({
          user_id: user.id,
          type: "recharge",
          amount_usd: finalPrice,
          coins: totalCoins,
          status: "completed",
          paypal_order_id: order_id,
          tier_label: finalTierLabel,
          description: `Recharge ${totalCoins} coins ($${finalPrice})`,
        });
      }

      return Response.json({ success: true, coins_credited: totalCoins });
    }

    // Action: create — create PayPal order, return approval URL
    const { price, tier_id, tier_label, coins, bonus_coins } = body;
    if (!price || !tier_id) {
      return Response.json({ error: "Missing price or tier_id" }, { status: 400 });
    }

    // Ensure price is a properly formatted string with 2 decimal places
    const priceStr = Number(price).toFixed(2);

    const token = await getAccessToken();
    const origin = req.headers.get("origin") || req.headers.get("referer") || "https://vyro.live";

    const orderRes = await fetchWithTimeout(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          reference_id: tier_id,
          description: tier_label || `Recharge ${Number(coins) + Number(bonus_coins || 0)} coins`,
          amount: {
            currency_code: "USD",
            value: priceStr,
          },
        }],
        application_context: {
          return_url: `${origin}/coins-recharge?status=success`,
          cancel_url: `${origin}/coins-recharge?status=cancelled`,
          brand_name: "VYRO Live",
          user_action: "PAY_NOW",
        },
      }),
    }, 15000);
    const orderData = await orderRes.json();

    if (!orderRes.ok || !orderData.id) {
      return Response.json({ error: extractPayPalError(orderData), paypal_response: orderData }, { status: 400 });
    }

    // Record pending transaction
    await base44.asServiceRole.entities.Transaction.create({
      user_id: user.id,
      type: "recharge",
      amount_usd: Number(price),
      coins: Number(coins) + Number(bonus_coins || 0),
      status: "pending",
      paypal_order_id: orderData.id,
      tier_label: tier_label || tier_id,
      description: `Pending recharge ${Number(coins) + Number(bonus_coins || 0)} coins ($${priceStr})`,
    });

    const approvalUrl = orderData.links?.find((l: any) => l.rel === "approve")?.href;
    if (!approvalUrl) {
      return Response.json({ error: "No approval URL returned from PayPal", paypal_response: orderData }, { status: 400 });
    }
    return Response.json({ order_id: orderData.id, approval_url: approvalUrl });
  } catch (error) {
    console.error("paypalRecharge error:", error?.message || error, error?.stack || "");
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
});