PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_session`("id", "user_id", "expiresAt") SELECT "id", "user_id", "expiresAt" FROM `user_session`;--> statement-breakpoint
DROP TABLE `user_session`;--> statement-breakpoint
ALTER TABLE `__new_user_session` RENAME TO `user_session`;--> statement-breakpoint
PRAGMA foreign_keys=ON;