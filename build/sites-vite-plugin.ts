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

async function maybeFetchAsset(request, env) {
  if (!env?.ASSETS?.fetch) {
    return null;
  }

  const response = await env.ASSETS.fetch(request);
  return response.status === 404 ? null : response;
}

async function handleImageOptimization(request, env) {
  const url = new URL(request.url);
  const source = url.searchParams.get("url");

  if (!source || !env?.ASSETS?.fetch) {
    return null;
  }

  return maybeFetchAsset(new Request(new URL(source, request.url)), env);
}

export default {
  async fetch(request, env, ctx) {
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
