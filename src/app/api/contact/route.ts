import { contactSchema } from "@/lib/contact-schema";
import { renderContactEmail } from "@/lib/email-template";
import { clientIp, oneLine, sendToOwner } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

const MIN_FILL_MS = 2000;

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60_000)) {
    console.warn("Contact form: rate limited");
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the form and try again.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { name, email, message, elapsedMs, hp_check } = parsed.data;

  // Spam heuristics (honeypot filled, or submitted instantly): pretend success so bots get no signal.
  const tooFast = typeof elapsedMs !== "number" || elapsedMs < MIN_FILL_MS;
  if (hp_check || tooFast) {
    console.warn("Contact form: submission dropped by spam check", { honeypot: !!hp_check, tooFast, elapsedMs });
    return Response.json({ ok: true });
  }

  const { html, text } = renderContactEmail({ name, email, message });
  const result = await sendToOwner({
    subject: `New portfolio message from ${oneLine(name)}`,
    replyTo: email,
    text,
    html,
  });
  return result.ok
    ? Response.json({ ok: true })
    : Response.json({ error: result.error }, { status: result.status });
}
