// Puts the rendered page (English) into dist-static/index.html, so search engines, LinkedIn link
// previews and anyone with scripts off see the full content — every role with its description.
// The browser then renders the live page over it (language switch, latest career data).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";

const root = fileURLToPath(new URL("..", import.meta.url));
globalThis.__STATIC_SITE__ = true;
const vite = await createServer({ configFile: root + "vite.static.config.ts", server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
try {
  const { default: PortfolioSite } = await vite.ssrLoadModule(root + "app/PortfolioSite.tsx");
  const html = renderToString(React.createElement(PortfolioSite));
  const file = root + "dist-static/index.html";
  const page = readFileSync(file, "utf8");
  if (!page.includes('<div id="root"></div>')) throw new Error("root element not found");
  writeFileSync(file, page.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  console.log(`prerendered ${Math.round(html.length / 1024)} KB of content`);
} finally {
  await vite.close();
}
