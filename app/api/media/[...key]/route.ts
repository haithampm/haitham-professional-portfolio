import { getMediaBucket } from "@/db";

export async function GET(request: Request) {
  let media: R2Bucket;

  try {
    media = await getMediaBucket();
  } catch {
    return Response.json(
      { error: "The MEDIA bucket is unavailable." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  const key = decodeURIComponent(url.pathname.replace(/^\/api\/media\//, ""));

  if (!key || key.includes("..")) {
    return Response.json({ error: "Invalid media key." }, { status: 400 });
  }

  const object = await media.get(key);

  if (!object) {
    return Response.json({ error: "Media not found." }, { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
