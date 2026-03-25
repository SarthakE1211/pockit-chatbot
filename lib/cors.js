// ============================================================
// lib/cors.js
// Add CORS headers so external sites can call your Next.js API
// ============================================================

/**
 * Allowed origins — add every domain that embeds the widget.
 * Use ["*"] to allow ALL origins (fine for public chatbots).
 */
const ALLOWED_ORIGINS = [
    "*", // ← change to specific domains for tighter security
    // "https://client-site.com",
    // "https://partner.example.com",
];

/**
 * Call this at the top of your POST (and OPTIONS) handler.
 * Returns a Response if this is a preflight — you must return it immediately.
 *
 * Usage in app/api/chat/route.js:
 *
 *   import { handleCORS, corsHeaders } from "@/lib/cors";
 *
 *   export async function OPTIONS(req) {
 *     return handleCORS(req) ?? new Response(null, { status: 204 });
 *   }
 *
 *   export async function POST(req) {
 *     const preflight = handleCORS(req);
 *     if (preflight) return preflight;
 *     // ... your existing handler ...
 *     return Response.json({ success: true, data: answer }, { headers: corsHeaders(req) });
 *   }
 */

export function getOriginHeader(req) {
    const origin = req.headers.get("origin") || "";
    if (ALLOWED_ORIGINS.includes("*")) return "*";
    if (ALLOWED_ORIGINS.includes(origin)) return origin;
    return ALLOWED_ORIGINS[0] ?? "";
}

export function corsHeaders(req) {
    return {
        "Access-Control-Allow-Origin": getOriginHeader(req),
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
    };
}

export function handleCORS(req) {
    // Preflight request
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders(req),
        });
    }
    return null; // not a preflight, continue normally
}