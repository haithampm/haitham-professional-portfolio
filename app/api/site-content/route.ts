import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { isAdminRequest, routeErrorMessage, unauthorized } from "../_utils";

const editableKeys = new Set([
  "heroLabelEn",
  "heroLabelAr",
  "heroTitleEn",
  "heroTitleAr",
  "heroSummaryEn",
  "heroSummaryAr",
  "profileSummaryEn",
  "profileSummaryAr",
]);

export async function GET() {
  try {
    const db = await getDb();
    const rows = await db.select().from(siteSettings);

    return Response.json({
      content: Object.fromEntries(rows.map((row) => [row.key, row.value])),
    });
  } catch (error) {
    return Response.json({
      content: {},
      warning: routeErrorMessage(error),
    });
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const entries = Object.entries(payload)
      .filter(([key]) => editableKeys.has(key))
      .map(([key, value]) => [key, String(value ?? "").trim()] as const);

    if (!entries.length) {
      return Response.json({ error: "No editable content was provided." }, { status: 400 });
    }

    const db = await getDb();
    const updatedAt = new Date().toISOString();

    for (const [key, value] of entries) {
      await db
        .insert(siteSettings)
        .values({ key, value, updatedAt })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: { value, updatedAt },
        });
    }

    return Response.json({
      ok: true,
      content: Object.fromEntries(entries),
    });
  } catch (error) {
    return Response.json(
      { error: routeErrorMessage(error) },
      { status: 500 }
    );
  }
}
