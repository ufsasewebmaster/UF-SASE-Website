ALTER TABLE `meeting_slides` ADD `category` text NOT NULL;--> statement-breakpoint
ALTER TABLE `meeting_slides` ADD `date` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `meeting_slides` ADD `semester` text NOT NULL;--> statement-breakpoint
ALTER TABLE `meeting_slides` DROP COLUMN `parent_folder`;--> statement-breakpoint
ALTER TABLE `meeting_slides` DROP COLUMN `last_modified`;--> statement-breakpoint
ALTER TABLE `meeting_slides` DROP COLUMN `relative_order`;