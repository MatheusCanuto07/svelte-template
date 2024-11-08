CREATE TABLE `sessionTable` (
	`id` text PRIMARY KEY NOT NULL,
	`session_user_id` integer,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`session_user_id`) REFERENCES `userTable`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `userTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userTable_email_unique` ON `userTable` (`email`);--> statement-breakpoint
DROP TABLE `user_session`;--> statement-breakpoint
DROP TABLE `user`;