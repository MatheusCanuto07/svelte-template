import { sqliteTable,integer, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
	id: integer('id').primaryKey(),
	fullName: text('full_name').notNull(),
  phone: text('phone',{length: 256}).notNull()
});

export const todoTable = sqliteTable('todo', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  desc: text('desc').notNull()
})
