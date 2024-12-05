CREATE TABLE `blog_tag_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`blog_id` text,
	`tag_id` text,
	FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `blog_tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `blog_tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blog` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author_id` text,
	`published_date` integer NOT NULL,
	`time_updated` integer NOT NULL,
	`last_update_date` integer NOT NULL,
	`tags` text,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `email_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`subscribed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`time_added` integer NOT NULL,
	`time_updated` integer NOT NULL,
	`location` text NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`involved_groups` text
);
--> statement-breakpoint
CREATE TABLE `mentor_mentee_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`mentor_id` text,
	`mentee_id` text,
	FOREIGN KEY (`mentor_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mentee_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `personal_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` blob,
	`area_code` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `professional_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`resume_path` text,
	`linkedin` text,
	`portfolio` text,
	`majors` text,
	`minors` text,
	`graduation_semester` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sase_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`events_attended` text,
	`mentors` text,
	`mentees` text,
	`groups` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`time_added` integer NOT NULL,
	`time_updated` integer NOT NULL,
	`points` integer,
	`roles` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_tag_name_unique` ON `blog_tag` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_title_unique` ON `blog` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_subscriber_email_unique` ON `email_subscriber` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `event_name_unique` ON `event` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `personal_info_email_unique` ON `personal_info` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `personal_info_phone_unique` ON `personal_info` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);