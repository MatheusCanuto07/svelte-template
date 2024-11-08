PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`key_user_id` text,
	`hashed_password` text,
	FOREIGN KEY (`key_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_key`("id", "key_user_id", "hashed_password") SELECT "id", "key_user_id", "hashed_password" FROM `user_key`;--> statement-breakpoint
DROP TABLE `user_key`;--> statement-breakpoint
ALTER TABLE `__new_user_key` RENAME TO `user_key`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`session_user_id` integer,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`session_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_session`("id", "session_user_id", "expiresAt") SELECT "id", "session_user_id", "expiresAt" FROM `user_session`;--> statement-breakpoint
DROP TABLE `user_session`;--> statement-breakpoint
ALTER TABLE `__new_user_session` RENAME TO `user_session`;