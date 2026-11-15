import { MailConfigurationError, sendContactMessage } from "./contact-mail.mjs";

const MAX_BODY_BYTES = 16384;
const WINDOW_MS = 10 * 60 * 1000;
const EMAIL = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export function createContactHandler({ sendMail = sendContactMessage, now = Date.now } = {}) {
  // Best-effort protection per server instance; no visitor data is persisted.
  const attempts = new Map();
  return async function POST(request) {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return json({ error: "This request is not allowed." }, 403);
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json({ error: "Please submit the form as JSON." }, 415);
    }
    if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return json({ error: "Your message is too long." }, 413);
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json({ error: "Please complete all fields." }, 400);
      const decoder = new TextDecoder();
      let bytes = 0;
      let body = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BODY_BYTES) {
          await reader.cancel();
          return json({ error: "Your message is too long." }, 413);
        }
        body += decoder.decode(value, { stream: true });
      }
      data = JSON.parse(body + decoder.decode());
    } catch {
      return json({ error: "Invalid form submission." }, 400);
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) return json({ error: "Invalid form submission." }, 400);
    const limits = { from_email: 254, from_name: 120, subject: 200, message: 5000 };
    const fields = {};
    for (const [name, limit] of Object.entries(limits)) {
      if (typeof data[name] !== "string" || !data[name].trim() || data[name].trim().length > limit) {
        return json({ error: "Please complete all fields within the allowed lengths." }, 400);
      }
      fields[name] = data[name].trim();
    }
    if (!EMAIL.test(fields.from_email) || [fields.from_email, fields.from_name, fields.subject].some(value => /[\r\n]/.test(value))) {
      return json({ error: "Please enter a valid email, name and subject." }, 400);
    }
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const time = now();
    for (const [key, attempt] of attempts) if (attempt.until <= time) attempts.delete(key);
    const attempt = attempts.get(ip);
    if (attempt?.count >= 5) return json({ error: "Too many messages. Please try again in 10 minutes." }, 429, { "Retry-After": String(Math.ceil((attempt.until - time) / 1000)) });
    if (!attempt && attempts.size >= 2000) attempts.delete(attempts.keys().next().value);
    attempts.set(ip, { count: (attempt?.count || 0) + 1, until: attempt?.until || time + WINDOW_MS });
    try {
      await sendMail(fields);
      return json({ message: "Message sent successfully. Thank you for reaching out!" });
    } catch (error) {
      if (error instanceof MailConfigurationError) return json({ error: "Email is not configured yet. Please try again later." }, 503);
      return json({ error: "Unable to send your message right now. Please try again later." }, 502);
    }
  };
}
