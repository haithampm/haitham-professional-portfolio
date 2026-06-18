import { desc, eq } from "drizzle-orm";
import { getDb, getMediaBucket } from "@/db";
import { galleryImages } from "@/db/schema";
import {
  cleanFileName,
  cleanText,
  isAdminRequest,
  routeErrorMessage,
  unauthorized,
} from "../_utils";

export async function GET() {
  try {
    const db = getDb();
    const images = await db
      .select()
      .from(galleryImages)
      .orderBy(desc(galleryImages.sortOrder), desc(galleryImages.createdAt));

    return Response.json({ images });
  } catch (error) {
    return Response.json({
      images: [],
      warning: routeErrorMessage(error),
    });
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const imageUrl = cleanText(form.get("imageUrl"));
    const titleEn = cleanText(form.get("titleEn"));
    const titleAr = cleanText(form.get("titleAr"));
    const altEn = cleanText(form.get("altEn")) || titleEn;
    const altAr = cleanText(form.get("altAr")) || titleAr;
    const sortOrder = Number.parseInt(cleanText(form.get("sortOrder")), 10) || 0;

    let src = imageUrl;
    let storageKey: string | null = null;

    if (file instanceof File && file.size > 0) {
      let media: R2Bucket;

      try {
        media = getMediaBucket();
      } catch {
        return Response.json(
          { error: "The MEDIA bucket is unavailable for file uploads." },
          { status: 503 }
        );
      }

      const safeName = cleanFileName(file.name) || "portfolio-image";
      storageKey = `gallery/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

      await media.put(storageKey, await file.arrayBuffer(), {
        httpMetadata: {
          contentType: file.type || "application/octet-stream",
          cacheControl: "public, max-age=31536000",
        },
      });

      src = `/api/media/${storageKey}`;
    }

    if (!src) {
      return Response.json(
        { error: "Upload an image file or provide an image URL." },
        { status: 400 }
      );
    }

    const db = getDb();
    const [image] = await db
      .insert(galleryImages)
      .values({
        id: crypto.randomUUID(),
        titleEn,
        titleAr,
        altEn,
        altAr,
        src,
        storageKey,
        sortOrder,
      })
      .returning();

    return Response.json({ image }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: routeErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Image id is required." }, { status: 400 });
    }

    const db = getDb();
    const [image] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id))
      .limit(1);

    if (!image) {
      return Response.json({ error: "Image was not found." }, { status: 404 });
    }

    await db.delete(galleryImages).where(eq(galleryImages.id, id));

    if (image.storageKey) {
      try {
        const media = getMediaBucket();
        await media.delete(image.storageKey);
      } catch {
        // The database row is already removed; missing media cleanup should not
        // block the admin action in local or partially configured environments.
      }
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: routeErrorMessage(error) },
      { status: 500 }
    );
  }
}
