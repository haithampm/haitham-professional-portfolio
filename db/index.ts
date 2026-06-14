import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type WorkersEnv = {
  DB?: D1Database;
  MEDIA?: R2Bucket;
};

async function getWorkersEnv(): Promise<WorkersEnv> {
  const moduleName = "cloudflare:workers";

  try {
    const workers = (await import(/* @vite-ignore */ moduleName)) as {
      env?: WorkersEnv;
    };

    return workers.env ?? {};
  } catch {
    return {};
  }
}

export async function getDb() {
  const env = await getWorkersEnv();

  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

export async function getMediaBucket() {
  const env = await getWorkersEnv();

  if (!env.MEDIA) {
    throw new Error(
      "Cloudflare R2 binding `MEDIA` is unavailable. Set the `r2` field in .openai/hosting.json to `MEDIA` before using media uploads."
    );
  }

  return env.MEDIA;
}
