import "server-only";
import { escapeHtml, oneLine } from "./mail";

interface ContactEmailInput {
  name: string;
  email: string;
  message: string;
}

const ACCENT = "#4f46e5";

/** Email-client-safe HTML (table layout, inline styles) plus a plain-text fallback. */
export function renderContactEmail({ name, email, message }: ContactEmailInput) {
  const received = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const firstName = escapeHtml(name.split(/\s+/)[0] ?? name);
  const preview = escapeHtml(oneLine(message).slice(0, 120));
  const replyHref = `mailto:${encodeURIComponent(email).replace(/%40/g, "@")}?subject=${encodeURIComponent(`Re: your message on my portfolio`)}`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 16px 6px 0;font-size:13px;color:#71717a;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-size:14px;color:#18181b;">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f4f5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="height:4px;background:${ACCENT};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${ACCENT};">New message · Portfolio</div>
          <h1 style="margin:12px 0 0;font-size:22px;line-height:1.3;color:#18181b;font-weight:600;">${safeName} sent you a message</h1>
        </td></tr>
        <tr><td style="padding:12px 32px 4px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            ${row("From", safeName)}
            ${row("Email", `<a href="mailto:${safeEmail}" style="color:${ACCENT};text-decoration:none;">${safeEmail}</a>`)}
            ${row("Received", escapeHtml(received) + " IST")}
          </table>
        </td></tr>
        <tr><td style="padding:16px 32px 8px;">
          <div style="border-left:3px solid ${ACCENT};background:#fafafa;border-radius:0 8px 8px 0;padding:16px 18px;font-size:15px;line-height:1.65;color:#27272a;white-space:pre-wrap;word-wrap:break-word;">${escapeHtml(message)}</div>
        </td></tr>
        <tr><td style="padding:20px 32px 28px;">
          <a href="${replyHref}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:8px;">Reply to ${firstName}</a>
        </td></tr>
        <tr><td style="padding:16px 32px;border-top:1px solid #e4e4e7;font-size:12px;line-height:1.5;color:#a1a1aa;">
          Sent from the contact form on your portfolio. You can also reply directly to this email &mdash; it goes to ${safeEmail}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `New message from your portfolio

From:     ${name}
Email:    ${email}
Received: ${received} IST

${message}

—
Reply to this email to respond to ${name}.`;

  return { html, text };
}
