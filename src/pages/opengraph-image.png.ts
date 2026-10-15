import sharp from "sharp";

import { DATA } from "@/data/resume";

export async function GET() {
  const name = DATA.name
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#faf9f6"/><rect width="1200" height="12" fill="#18181b"/>
    <g font-family="DejaVu Sans, sans-serif" fill="#18181b">
      <text x="72" y="100" font-size="26" fill="#52525b">Payment infrastructure for AI agents</text>
      <text x="72" y="256" font-size="88" font-weight="700" letter-spacing="-4">${name}</text>
      <text x="72" y="326" font-size="40">x402 &amp; agentic commerce</text>
      <text x="72" y="384" font-size="28" fill="#52525b">Co-founder of Bags · x402 contributor and maintainer</text>
      <text x="72" y="430" font-size="28" fill="#52525b">Google Summer of Code 2026 mentor · OWASP BLT</text>
      <text x="72" y="566" font-size="26">www.vedant-dev.com</text>
    </g>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
