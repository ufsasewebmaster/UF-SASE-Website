CREATE TABLE `email_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`subscribed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_subscriber_email_unique` ON `email_subscriber` (`email`);--> statement-breakpoint
CREATE TABLE `meeting_slides` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`name` text NOT NULL,
	`date` integer NOT NULL,
	`semester` text NOT NULL,
	`thumbnail_url` text NOT NULL,
	`embed_url` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `meeting_slides_thumbnail_url_unique` ON `meeting_slides` (`thumbnail_url`);--> statement-breakpoint
CREATE UNIQUE INDEX `meeting_slides_embed_url_unique` ON `meeting_slides` (`embed_url`);--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE TABLE `user_roles_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`role`) REFERENCES `roles`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog_tag_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`blog_id` text,
	`tag_id` text,
	FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `blog_tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_blog_tag_relationship`("id", "blog_id", "tag_id") SELECT "id", "blog_id", "tag_id" FROM `blog_tag_relationship`;--> statement-breakpoint
DROP TABLE `blog_tag_relationship`;--> statement-breakpoint
ALTER TABLE `__new_blog_tag_relationship` RENAME TO `blog_tag_relationship`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_mentor_mentee_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`mentor_id` text,
	`mentee_id` text,
	FOREIGN KEY (`mentor_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`mentee_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_mentor_mentee_relationship`("id", "mentor_id", "mentee_id") SELECT "id", "mentor_id", "mentee_id" FROM `mentor_mentee_relationship`;--> statement-breakpoint
DROP TABLE `mentor_mentee_relationship`;--> statement-breakpoint
ALTER TABLE `__new_mentor_mentee_relationship` RENAME TO `mentor_mentee_relationship`;--> statement-breakpoint
CREATE TABLE `__new_personal_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`discord` text DEFAULT '' NOT NULL,
	`area_code` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_personal_info`("user_id", "first_name", "last_name", "bio", "phone", "discord", "area_code") SELECT "user_id", "first_name", "last_name", "bio", "phone", "discord", "area_code" FROM `personal_info`;--> statement-breakpoint
DROP TABLE `personal_info`;--> statement-breakpoint
ALTER TABLE `__new_personal_info` RENAME TO `personal_info`;--> statement-breakpoint
CREATE TABLE `__new_professional_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`resume_path` text,
	`linkedin` text,
	`portfolio` text,
	`majors` text,
	`minors` text,
	`graduation_semester` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_professional_info`("user_id", "resume_path", "linkedin", "portfolio", "majors", "minors", "graduation_semester") SELECT "user_id", "resume_path", "linkedin", "portfolio", "majors", "minors", "graduation_semester" FROM `professional_info`;--> statement-breakpoint
DROP TABLE `professional_info`;--> statement-breakpoint
ALTER TABLE `__new_professional_info` RENAME TO `professional_info`;--> statement-breakpoint
CREATE TABLE `__new_sase_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`events_attended` text,
	`groups` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sase_info`("user_id", "events_attended", "groups") SELECT "user_id", "events_attended", "groups" FROM `sase_info`;--> statement-breakpoint
DROP TABLE `sase_info`;--> statement-breakpoint
ALTER TABLE `__new_sase_info` RENAME TO `sase_info`;--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "user_id", "expires_at") SELECT "id", "user_id", "expires_at" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
ALTER TABLE `event` ADD `slides_url` text;--> statement-breakpoint
ALTER TABLE `user` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `email` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `password_hash`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `roles`;--> statement-breakpoint
ALTER TABLE `blog` DROP COLUMN `last_update_date`;--> statement-breakpoint
ALTER TABLE `blog` DROP COLUMN `tags`;