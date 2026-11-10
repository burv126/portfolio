import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFonts() {
  const directory = join(process.cwd(), "node_modules", "@fontsource", "manrope", "files");
  const [latin, cyrillic] = await Promise.all([
    readFile(join(directory, "manrope-latin-600-normal.woff")),
    readFile(join(directory, "manrope-cyrillic-600-normal.woff")),
  ]);
  return [
    { name: "Manrope", data: latin, weight: 600 as const, style: "normal" as const },
    { name: "Manrope", data: cyrillic, weight: 600 as const, style: "normal" as const },
  ];
}

export default async function OpenGraphImage() {
  const fonts = await loadFonts().catch(() => []);
  const headline = fonts.length > 0 ? "Цифровые продукты для реальных задач бизнеса" : "Digital products for real business problems";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060910",
          color: "#f4f7fb",
          padding: "72px",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#8aebff" }}>Full-Stack & AI Developer</div>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.08, fontWeight: 600, maxWidth: "980px" }}>{headline}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 36 }}>{siteConfig.name}</div>
          <div style={{ display: "flex", fontSize: 24, color: "#a9b6cc" }}>SaaS · AI</div>
        </div>
      </div>
    ),
    fonts.length > 0 ? { ...size, fonts } : size,
  );
}
