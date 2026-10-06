import "server-only";
import { Resend } from "resend";

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip")?.trim() ||
  "unknown";

export const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

type SendResult = { ok: true } | { ok: false; status: number; error: string };

/** Sends an email to the site owner via Resend. Secrets stay server-side. */
export async function sendToOwner(mail: {
  subject: string;
  replyTo: string;
  text: string;
  html: string;
}): Promise<SendResult> {
  const { RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL || !FROM_EMAIL) {
    console.error("Mail: RESEND_API_KEY, CONTACT_EMAIL or FROM_EMAIL is not set.");
    return { ok: false, status: 503, error: "Messaging is temporarily unavailable." };
  }
  try {
    const { data, error } = await new Resend(RESEND_API_KEY).emails.send({
      // Show a friendly sender name unless FROM_EMAIL already includes one.
      from: FROM_EMAIL.includes("<") ? FROM_EMAIL : `Hema Priya Portfolio <${FROM_EMAIL}>`,
      to: CONTACT_EMAIL,
      ...mail,
    });
    if (error) throw new Error(error.message);
    console.info("Mail: accepted by Resend", { id: data?.id, subject: mail.subject });
    return { ok: true };
  } catch (err) {
    console.error("Mail: send failed", err);
    return { ok: false, status: 502, error: "Could not send your message. Please try again." };
  }
}
