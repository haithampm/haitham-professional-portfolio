import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type SiteEnv = {
  DB?: D1Database;
  MEDIA?: R2Bucket;
};

function getSiteEnv() {
  return (globalThis as typeof globalThis & { __SITE_ENV__?: SiteEnv })
    .__SITE_ENV__;
}

export function getDb() {
  const env = getSiteEnv();

  if (!env?.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

export function getMediaBucket() {
  const env = getSiteEnv();

  if (!env?.MEDIA) {
    throw new Error(
      "Cloudflare R2 binding `MEDIA` is unavailable. Set the `r2` field in .openai/hosting.json to `MEDIA` before using media uploads."
    );
  }

  return env.MEDIA;
}
