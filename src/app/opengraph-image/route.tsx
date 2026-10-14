import { ImageResponse } from "next/og";

import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        background: "#faf9f6",
        color: "#18181b",
        fontFamily: "sans-serif",
        borderTop: "12px solid #18181b",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, color: "#52525b" }}>
        Payment infrastructure for AI agents
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          {DATA.name}
        </div>
        <div style={{ display: "flex", fontSize: 40 }}>
          x402 &amp; agentic commerce
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#52525b" }}>
          Co-founder of Bags · x402 contributor and maintainer
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#52525b" }}>
          Google Summer of Code 2026 mentor · OWASP BLT
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26 }}>www.vedant-dev.com</div>
    </div>,
    { width: 1200, height: 630 }
  );
}
