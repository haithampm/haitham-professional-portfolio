CREATE TABLE `logo_items` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`subtitle_en` text DEFAULT '' NOT NULL,
	`subtitle_ar` text DEFAULT '' NOT NULL,
	`source` text DEFAULT '' NOT NULL,
	`logo` text,
	`mark` text,
	`dark` integer DEFAULT 0 NOT NULL,
	`storage_key` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
