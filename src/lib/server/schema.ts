import { sqliteTable,integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const todoTable = sqliteTable('todo', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  desc: text('desc').notNull()
})

export const userTable = sqliteTable("userTable", {
  // Requisito do lucia
	id: integer("id").primaryKey(),
	// other user attributes
  name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const sessionTable = sqliteTable("sessionTable", {
	id: text("id").primaryKey().notNull(),

	userId: integer("session_user_id")
		.references(() => userTable.id),

	expiresAt: integer("expiresAt", {mode: "timestamp"}).notNull(),
});

export type Todo = typeof todoTable.$inferSelect 
export type UserInsertSchema = typeof userTable.$inferInsert;

export type User = typeof userTable.$inferSelect;
export type Session = typeof sessionTable.$inferSelect;

// db:generate: "drizzle-kit generate:sqlite"
// Esse comando gera o código SQL ou o esquema do banco de dados com base nas definições do projeto. Ele lê a estrutura configurada e cria os arquivos necessários para inicializar o banco de dados.

// db:push: "drizzle-kit push:sqlite"
// Esse comando aplica as migrações pendentes ao banco de dados. É útil quando você faz alterações no esquema e quer atualizar o banco com as novas definições.

// db:pull: "drizzle-kit introspect:sqlite"
// Esse comando inspeciona o banco de dados atual e gera um esquema para o projeto com base nas tabelas e colunas existentes no banco.

// db:drop: "drizzle-kit drop"
// Esse comando exclui o banco de dados ou o esquema inteiro. É importante usar com cuidado, pois essa ação remove todos os dados armazenados.

// db:check: "drizzle-kit check:sqlite"
// Esse comando verifica se há algum problema no esquema, como conflitos entre o código do projeto e o banco de dados, garantindo que as definições estejam sincronizadas.

// db:studio: "drizzle-kit studio"
// Esse comando abre uma interface gráfica para o banco de dados, permitindo visualizar e editar tabelas, registros e estrutura diretamente por meio de um ambiente interativo.

// Exemplo de como executar: 
// Gera um novo código sql: pnpm drizzle-kit generate
// Executa esse novo sql e cria um novo banco: pnpm drizzle-kit push