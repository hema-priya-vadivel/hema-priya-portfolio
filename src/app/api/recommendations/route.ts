import { getRecommendations } from "@/lib/recommendations";

export async function GET() {
  return Response.json(await getRecommendations());
}
