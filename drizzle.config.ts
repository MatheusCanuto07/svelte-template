import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	dialect: "sqlite",
	dbCredentials: {
		url: process.env.DATABASE_URL ? process.env.DATABASE_URL : "file:local.db"
	}
} satisfies Config;
