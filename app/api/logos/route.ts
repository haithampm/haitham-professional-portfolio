import { desc, eq } from "drizzle-orm";
import { getDb, getMediaBucket } from "@/db";
import { logoItems } from "@/db/schema";
import {
  cleanFileName,
  cleanText,
  isAdminRequest,
  routeErrorMessage,
  unauthorized,
} from "../_utils";

const logoCategories = new Set(["companies", "partners", "certifications"]);

function isLogoCategory(value: string) {
  return logoCategories.has(value);
}

function cleanBoolean(value: FormDataEntryValue | null) {
  return value === "true" || value === "on" || value === "1";
}

function toLogoDto(row: typeof logoItems.$inferSelect) {
  return {
    ...row,
    dark: Boolean(row.dark),
  };
}

export async function GET() {
  try {
    const db = getDb();
    const logos = await db
      .select()
      .from(logoItems)
      .orderBy(
        desc(logoItems.sortOrder),
        desc(logoItems.createdAt),
        desc(logoItems.name)
      );

    return Response.json({ logos: logos.map(toLogoDto) });
  } catch (error) {
    return Response.json({
      logos: [],
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
    const category = cleanText(form.get("category"));
    const name = cleanText(form.get("name"));
    const subtitleEn = cleanText(form.get("subtitleEn"));
    const subtitleAr = cleanText(form.get("subtitleAr"));
    const source = cleanText(form.get("source"));
    const logoUrl = cleanText(form.get("logoUrl"));
    const mark = cleanText(form.get("mark"));
    const sortOrder = Number.parseInt(cleanText(form.get("sortOrder")), 10) || 0;
    const dark = cleanBoolean(form.get("dark"));
    const file = form.get("file");

    if (!isLogoCategory(category)) {
      return Response.json(
        { error: "Choose companies, partners, or certifications." },
        { status: 400 }
      );
    }

    if (!name) {
      return Response.json({ error: "Logo name is required." }, { status: 400 });
    }

    let logo = logoUrl;
    let storageKey: string | null = null;

    if (file instanceof File && file.size > 0) {
      let media: R2Bucket;

      try {
        media = getMediaBucket();
      } catch {
        return Response.json(
          { error: "The MEDIA bucket is unavailable for logo uploads." },
          { status: 503 }
        );
      }

      const safeName = cleanFileName(file.name) || "logo";
      storageKey = `logos/${category}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

      await media.put(storageKey, await file.arrayBuffer(), {
        httpMetadata: {
          contentType: file.type || "application/octet-stream",
          cacheControl: "public, max-age=31536000",
        },
      });

      logo = `/api/media/${storageKey}`;
    }

    if (!logo && !mark) {
      return Response.json(
        { error: "Upload a logo file, add a logo URL, or enter a text mark." },
        { status: 400 }
      );
    }

    const db = getDb();
    const [createdLogo] = await db
      .insert(logoItems)
      .values({
        id: crypto.randomUUID(),
        category,
        name,
        subtitleEn,
        subtitleAr,
        source,
        logo,
        mark: mark || name,
        dark: dark ? 1 : 0,
        storageKey,
        sortOrder,
      })
      .returning();

    return Response.json({ logo: toLogoDto(createdLogo) }, { status: 201 });
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
      return Response.json({ error: "Logo id is required." }, { status: 400 });
    }

    const db = getDb();
    const [logo] = await db
      .select()
      .from(logoItems)
      .where(eq(logoItems.id, id))
      .limit(1);

    if (!logo) {
      return Response.json({ error: "Logo was not found." }, { status: 404 });
    }

    await db.delete(logoItems).where(eq(logoItems.id, id));

    if (logo.storageKey) {
      try {
        const media = getMediaBucket();
        await media.delete(logo.storageKey);
      } catch {
        // Metadata deletion is the critical admin action. Missing media cleanup
        // should not block deletion in partially configured environments.
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
