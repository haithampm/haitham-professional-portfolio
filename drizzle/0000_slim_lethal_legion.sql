CREATE TABLE `gallery_images` (
	`id` text PRIMARY KEY NOT NULL,
	`title_en` text DEFAULT '' NOT NULL,
	`title_ar` text DEFAULT '' NOT NULL,
	`alt_en` text DEFAULT '' NOT NULL,
	`alt_ar` text DEFAULT '' NOT NULL,
	`src` text NOT NULL,
	`storage_key` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
