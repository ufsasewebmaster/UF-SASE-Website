ALTER TABLE `user` RENAME COLUMN "password_hash" TO "password";--> statement-breakpoint
CREATE TABLE `email_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`subscribed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_subscriber_email_unique` ON `email_subscriber` (`email`);--> statement-breakpoint
ALTER TABLE `user` ADD `email` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
DROP INDEX IF EXISTS `personal_info_email_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS "blog_tag_name_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_title_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "email_subscriber_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "event_name_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "personal_info_phone_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "user_username_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "user_email_unique";--> statement-breakpoint
ALTER TABLE `personal_info` ALTER COLUMN "phone" TO "phone" text;--> statement-breakpoint
CREATE UNIQUE INDEX `blog_tag_name_unique` ON `blog_tag` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_title_unique` ON `blog` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `event_name_unique` ON `event` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `personal_info_phone_unique` ON `personal_info` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
ALTER TABLE `personal_info` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `event` ADD `slides_url` text;--> statement-breakpoint
ALTER TABLE `blog` DROP COLUMN `last_update_date`;--> statement-breakpoint
ALTER TABLE `blog` DROP COLUMN `tags`;--> statement-breakpoint
ALTER TABLE `sase_info` DROP COLUMN `mentors`;--> statement-breakpoint
ALTER TABLE `sase_info` DROP COLUMN `mentees`;