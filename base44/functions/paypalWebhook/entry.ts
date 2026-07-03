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

    // Verify webhook signature
    const webhookId = Deno.env.get("PAYPAL_WEBHOOK_ID");
    const token = await getAccessToken();

    const headers = {};
    req.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });

    const rawBody = await req.text();

    const verifyRes = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers["paypal-auth-algo"],
        cert_url: headers["paypal-cert-url"],
        transmission_id: headers["paypal-transmission-id"],
        transmission_sig: headers["paypal-transmission-sig"],
        transmission_time: headers["paypal-transmission-time"],
        webhook_id: webhookId,
        webhook_event: JSON.parse(rawBody),
      }),
    });
    const verifyData = await verifyRes.json();

    if (verifyData.verification_status !== "SUCCESS") {
      return Response.json({ error: "Webhook verification failed" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Handle payment capture completed
    if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const orderId = event.resource?.supplementary_data?.related_ids?.order_id || event.resource?.id;
      const amount = parseFloat(event.resource?.amount?.value || "0");

      // Find pending transaction by order ID
      const txns = await base44.asServiceRole.entities.Transaction.filter({
        paypal_order_id: orderId,
        status: "pending",
      });

      if (txns.length > 0) {
        const txn = txns[0];
        if (txn.status === "pending") {
          await base44.asServiceRole.entities.Transaction.update(txn.id, {
            status: "completed",
          });

          // Credit coins if not already credited
          const profiles = await base44.asServiceRole.entities.UserProfile.filter({ user_id: txn.user_id });
          if (profiles.length > 0) {
            const p = profiles[0];
            await base44.asServiceRole.entities.UserProfile.update(p.id, {
              coins: (p.coins || 0) + txn.coins,
            });
          }
        }
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});