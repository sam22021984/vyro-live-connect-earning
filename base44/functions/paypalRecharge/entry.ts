import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const PAYPAL_BASE = Deno.env.get("PAYPAL_MODE") === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  const auth = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
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
      const token = await getAccessToken();

      const captureRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${order_id}/capture`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const captureData = await captureRes.json();

      if (captureData.status !== "COMPLETED") {
        return Response.json({ error: "Payment not completed", details: captureData }, { status: 400 });
      }

      const totalCoins = coins + bonus_coins;

      // Credit coins to user profile
      const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: user.id });
      if (profiles.length > 0) {
        const p = profiles[0];
        await base44.asServiceRole.entities.UserProfile.update(p.id, {
          coins: (p.coins || 0) + totalCoins,
        });
      }

      // Record transaction
      await base44.asServiceRole.entities.Transaction.create({
        user_id: user.id,
        type: "recharge",
        amount_usd: price,
        coins: totalCoins,
        status: "completed",
        paypal_order_id: order_id,
        tier_label: tier_label || tier_id,
        description: `Recharge ${totalCoins} coins ($${price})`,
      });

      return Response.json({ success: true, coins_credited: totalCoins });
    }

    // Action: create — create PayPal order, return approval URL
    const { price, tier_id, tier_label, coins, bonus_coins } = body;
    if (!price || !tier_id) {
      return Response.json({ error: "Missing price or tier_id" }, { status: 400 });
    }

    const token = await getAccessToken();
    const origin = req.headers.get("origin") || "https://vyro.live";

    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          reference_id: tier_id,
          description: tier_label || `Recharge ${coins + bonus_coins} coins`,
          amount: {
            currency_code: "USD",
            value: price.toFixed(2),
          },
        }],
        application_context: {
          return_url: `${origin}/coins-recharge?status=success&order_id={ORDER_ID}&tier_id=${tier_id}&price=${price}&coins=${coins}&bonus=${bonus_coins}&label=${encodeURIComponent(tier_label || "")}`,
          cancel_url: `${origin}/coins-recharge?status=cancelled`,
          brand_name: "VYRO Live",
          user_action: "PAY_NOW",
        },
      }),
    });
    const orderData = await orderRes.json();

    if (orderData.error) {
      return Response.json({ error: orderData.error.message || "PayPal order creation failed" }, { status: 400 });
    }

    // Record pending transaction
    await base44.asServiceRole.entities.Transaction.create({
      user_id: user.id,
      type: "recharge",
      amount_usd: price,
      coins: coins + bonus_coins,
      status: "pending",
      paypal_order_id: orderData.id,
      tier_label: tier_label || tier_id,
      description: `Pending recharge ${coins + bonus_coins} coins ($${price})`,
    });

    const approvalUrl = orderData.links?.find((l) => l.rel === "approve")?.href;
    return Response.json({ order_id: orderData.id, approval_url: approvalUrl });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});