/**
 * Fixed-window in-memory rate limiter.
 * Note: state is per server instance, so on serverless platforms it is a
 * best-effort guard. Swap for a shared store (e.g. Upstash/Redis) if abuse
 * becomes a problem.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  // Local dev has no real client IPs (everything is "unknown"), so limiting would only block your own testing.
  if (process.env.NODE_ENV !== "production") return true;
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
