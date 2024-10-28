CREATE TABLE `todo` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`desc` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`phone` text(256) NOT NULL
);
