PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`phone` text(256) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "full_name", "phone") SELECT "id", "full_name", "phone" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;