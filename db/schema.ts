import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: text("id").primaryKey(),
  titleEn: text("title_en").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  altEn: text("alt_en").notNull().default(""),
  altAr: text("alt_ar").notNull().default(""),
  src: text("src").notNull(),
  storageKey: text("storage_key"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const logoItems = sqliteTable("logo_items", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  name: text("name").notNull().default(""),
  subtitleEn: text("subtitle_en").notNull().default(""),
  subtitleAr: text("subtitle_ar").notNull().default(""),
  source: text("source").notNull().default(""),
  logo: text("logo"),
  mark: text("mark"),
  dark: integer("dark").notNull().default(0),
  storageKey: text("storage_key"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
