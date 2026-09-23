/**
 * Cloudflare Worker / Webhook Receiver for samscocommunications@gmail.com
 * 
 * Instructions:
 * 1. Deploy this worker to Cloudflare Workers (or Vercel Serverless / Supabase Edge Functions).
 * 2. Set Environment Secrets:
 *    - SUPABASE_URL: "https://your-project.supabase.co"
 *    - SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY: "your-key"
 * 3. In Cloudflare Dashboard -> Email Routing:
 *    - Route incoming emails (or forwarded emails from Gmail) directly to this Email Worker.
 *    - OR if using an HTTP Inbound webhook (such as SendGrid Inbound Parse or Resend Inbound),
 *      point the webhook URL to this Worker's HTTP POST endpoint.
 */

export default {
  // Option 1: Cloudflare Email Routing event handler
  async email(message, env, ctx) {
    const rawEmail = await new Response(message.raw).text();
    const sender = message.from;
    const recipient = message.to;
    const subject = message.headers.get("subject") || "(No Subject)";

    // Simple parser for plain text preview
    const bodyText = rawEmail.length > 50000 ? rawEmail.slice(0, 50000) : rawEmail;
    const snippet = subject.length > 80 ? subject.slice(0, 80) : subject;

    const payload = {
      sender_name: sender.split("<")[0].replace(/["']/g, "").trim() || sender,
      sender_email: sender.match(/<([^>]+)>/)?.[1] || sender,
      recipient: recipient,
      subject: subject,
      body_text: bodyText,
      snippet: snippet,
      status: "unread"
    };

    await postToSupabase(payload, env);
  },

  // Option 2: Direct HTTP Webhook endpoint (JSON or form-data from Resend / SendGrid / Mailgun)
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ status: "ok", service: "Samsco Inbound Mailbox Worker" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const contentType = request.headers.get("content-type") || "";
      let payload = {};

      if (contentType.includes("application/json")) {
        const data = await request.json();
        payload = {
          sender_name: data.from_name || data.sender_name || data.from?.name || (data.from ? String(data.from) : "Direct Contact"),
          sender_email: data.from_email || data.sender_email || data.from?.email || data.from || "unknown@client.com",
          recipient: data.to || data.recipient || "samscocommunications@gmail.com",
          subject: data.subject || "(No subject)",
          body_text: data.text || data.body_text || data.body || "",
          body_html: data.html || data.body_html || null,
          snippet: data.snippet || (data.text ? data.text.substring(0, 100) : data.subject || ""),
          status: "unread"
        };
      } else if (contentType.includes("form") || contentType.includes("multipart")) {
        const formData = await request.formData();
        payload = {
          sender_name: formData.get("from") ? String(formData.get("from")).split("<")[0].trim() : "Direct Contact",
          sender_email: formData.get("from") ? (String(formData.get("from")).match(/<([^>]+)>/)?.[1] || String(formData.get("from"))) : "unknown@client.com",
          recipient: formData.get("to") ? String(formData.get("to")) : "samscocommunications@gmail.com",
          subject: formData.get("subject") ? String(formData.get("subject")) : "(No subject)",
          body_text: formData.get("text") ? String(formData.get("text")) : "",
          body_html: formData.get("html") ? String(formData.get("html")) : null,
          snippet: formData.get("text") ? String(formData.get("text")).substring(0, 100) : "",
          status: "unread"
        };
      }

      const res = await postToSupabase(payload, env);
      return new Response(JSON.stringify({ success: true, record: res }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};

async function postToSupabase(payload, env) {
  const supabaseUrl = env.SUPABASE_URL || "https://your-supabase-url.supabase.co";
  const supabaseKey = env.SUPABASE_KEY || env.SUPABASE_ANON_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials missing in Worker environment variables.");
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/mailbox_emails`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "apikey": supabaseKey,
      "Authorization": `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify([payload])
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase insert failed (${response.status}): ${errorText}`);
  }

  return await response.json();
}
