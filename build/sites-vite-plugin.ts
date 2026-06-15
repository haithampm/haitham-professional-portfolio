import { access, cp, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

// Packages Sites metadata and migrations after Vite finishes compiling.
export function sites(): Plugin {
  let root = process.cwd();

  return {
    name: "sites",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const outputDirectory = resolve(root, "dist", ".openai");
      const hostingConfig = resolve(root, ".openai", "hosting.json");
      const drizzleSource = resolve(root, "drizzle");

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });

      if (await exists(hostingConfig)) {
        await cp(hostingConfig, resolve(outputDirectory, "hosting.json"));
      }
      if (await exists(drizzleSource)) {
        await cp(drizzleSource, resolve(outputDirectory, "drizzle"), {
          recursive: true,
        });
      }
    },
  };
}

// Windows ARM does not currently have a supported workerd package, so the
// Cloudflare Vite plugin cannot be imported locally. This keeps the generated
// bundle deployable by wrapping vinext's RSC entry in a Worker fetch handler.
export function staticWorkerEntrypoint(): Plugin {
  let root = process.cwd();
  let hasWrapped = false;

  return {
    name: "static-worker-entrypoint",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      if (hasWrapped) {
        return;
      }

      const serverDirectory = resolve(root, "dist", "server");
      const workerEntrypoint = resolve(serverDirectory, "index.js");
      const rscEntrypoint = resolve(serverDirectory, "rsc-entry.js");

      if (!(await exists(workerEntrypoint))) {
        return;
      }

      hasWrapped = true;
      await rm(rscEntrypoint, { force: true });
      await rename(workerEntrypoint, rscEntrypoint);
      await writeFile(
        workerEntrypoint,
        `import rscHandler from "./rsc-entry.js";

const PUBLIC_ASSET_PATH = /\\/[^/?]+\\.[^/]+$/;
const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

function contentTypeFor(pathname) {
  const extension = pathname.toLowerCase().match(/\\.[a-z0-9]+$/)?.[0];
  return CONTENT_TYPES[extension] ?? "application/octet-stream";
}

function cleanAssetPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const normalized = decoded.replace(/^\\/+/, "");

  if (!normalized || normalized.includes("..") || normalized.includes("\\\\")) {
    return null;
  }

  return normalized;
}

async function readLocalAsset(request) {
  if (typeof process === "undefined" || !process.versions?.node) {
    return null;
  }

  const url = new URL(request.url);
  const cleanPath = cleanAssetPath(url.pathname);

  if (!cleanPath) {
    return null;
  }

  const assetPath = cleanPath.startsWith("assets/")
    ? "../client/" + cleanPath
    : "../client/" + cleanPath;

  try {
    const [{ readFile }] = await Promise.all([import("node:fs/promises")]);
    const bytes = await readFile(new URL(assetPath, import.meta.url));
    return new Response(bytes, {
      headers: {
        "content-type": contentTypeFor(url.pathname),
        "cache-control": "public, max-age=3600",
      },
    });
  } catch {
    return null;
  }
}

async function maybeFetchAsset(request, env) {
  if (env?.ASSETS?.fetch) {
    const response = await env.ASSETS.fetch(request);
    return response.status === 404 ? null : response;
  }

  return readLocalAsset(request);
}

async function handleImageOptimization(request, env) {
  const url = new URL(request.url);
  const source = url.searchParams.get("url");

  if (!source) {
    return null;
  }

  return maybeFetchAsset(new Request(new URL(source, request.url)), env);
}

export default {
  async fetch(request, env, ctx) {
    globalThis.__SITE_ENV__ = env;

    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const imageResponse = await handleImageOptimization(request, env);
      if (imageResponse) {
        return imageResponse;
      }
    }

    if (url.pathname.startsWith("/assets/") || PUBLIC_ASSET_PATH.test(url.pathname)) {
      const assetResponse = await maybeFetchAsset(request, env);
      if (assetResponse) {
        return assetResponse;
      }
    }

    const response = await rscHandler(request, ctx);
    if (response instanceof Response) {
      return response;
    }

    if (response === null || typeof response === "undefined") {
      return new Response("Not found", { status: 404 });
    }

    return new Response(String(response));
  },
};
`,
        "utf-8"
      );
    },
  };
}
