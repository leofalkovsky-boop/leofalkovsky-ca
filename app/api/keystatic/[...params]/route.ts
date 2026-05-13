import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

const notConfigured = () => new Response(
  'CMS environment variables not configured yet.',
  { status: 503 }
);

let routeHandler: { GET: (r: Request) => Promise<Response>; POST: (r: Request) => Promise<Response> } | null = null;

try {
  routeHandler = makeRouteHandler({ config: keystaticConfig });
} catch {
  // env vars not set — will return 503 until configured
}

export async function GET(request: Request) {
  return routeHandler ? routeHandler.GET(request) : notConfigured();
}

export async function POST(request: Request) {
  return routeHandler ? routeHandler.POST(request) : notConfigured();
}
