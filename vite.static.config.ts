// Static build of the public site for GitHub Pages (free hosting):
//   npm run build:static  ->  dist-static/
// The page is the same PortfolioSite component; admin and the D1/R2 APIs are left out.
// Career data still refreshes at runtime from app/career-data.json on GitHub.
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

const base = process.env.STATIC_BASE ?? "/haitham-professional-portfolio/";

// Public files are referenced as "/file.png" in the app; prefix them with the Pages base path.
function prefixPublicPaths(): Plugin {
  const pattern = /(["'`])\/((?:logos\/)?[\w.-]+\.(?:png|jpe?g|svg|webp|pdf))\1/g;
  return {
    name: "prefix-public-paths",
    enforce: "pre",
    transform(code, id) {
      if (!/\/app\/[^/]+\.(t|j)sx?$/.test(id)) return null;
      return code.replace(pattern, (_m, q, path) => `${q}${base}${path}${q}`);
    },
  };
}

export default defineConfig({
  root: fileURLToPath(new URL("./static", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  base,
  plugins: [prefixPublicPaths(), react()],
  resolve: {
    alias: { "next/image": fileURLToPath(new URL("./static/next-image.tsx", import.meta.url)) },
  },
  build: {
    outDir: fileURLToPath(new URL("./dist-static", import.meta.url)),
    emptyOutDir: true,
  },
});
