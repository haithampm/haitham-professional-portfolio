/* eslint-disable @typescript-eslint/no-unused-vars */

type D1Database = import("@miniflare/d1").D1Database;

interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface R2ObjectBody {
  body: ReadableStream;
  httpMetadata?: {
    contentType?: string;
  };
  writeHttpMetadata(headers: Headers): void;
}

interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
  put(
    key: string,
    value: ArrayBuffer | ArrayBufferView | ReadableStream | string | null,
    options?: {
      httpMetadata?: {
        contentType?: string;
        cacheControl?: string;
      };
    }
  ): Promise<unknown>;
  delete(key: string): Promise<void>;
}

declare global {
  var __SITE_ENV__:
    | {
    DB?: D1Database;
    MEDIA?: R2Bucket;
      }
    | undefined;
}

export {};
