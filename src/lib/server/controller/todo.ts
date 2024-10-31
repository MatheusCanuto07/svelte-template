import { db } from "$lib/server/db";
import { todoTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
//typeof: Captura o tipo do objeto todoTable.
//.inferInsert: Esse método gera automaticamente o tipo necessário para criar ou inserir novos registros. Ou seja, ele infere quais campos são obrigatórios e opcionais para inserir um novo item na tabela todoTable.
type todoModel = typeof todoTable.$inferInsert;

// Objetivo: todoSelect representa o tipo dos dados ao selecionar registros da tabela todoTable.
// .inferSelect: Esse método infere todos os campos que podem ser retornados ao fazer uma consulta. Inclui tanto os campos obrigatórios quanto opcionais que podem estar no banco de dados.
type todoSelect = typeof todoTable.$inferSelect;

function listarTODO() {
  return db.select().from(todoTable);
}

function obterTodoId(id: todoSelect["id"]) {
  return db.select().from(todoTable).where(eq(todoTable.id, id));
}

// function obterTodoWithLimit(limit: number, offset: number){
//   return db.select 
// }

function inserirTODO(todo: todoModel) {
  return db.insert(todoTable).values(todo);
}

//Fala que o id é do mesmo tipo da coluna
function deleteTODO(id: todoSelect["id"]) {
  return db.delete(todoTable).where(eq(todoTable.id, id));
}

function updateTodo(id: todoSelect["id"], todo: todoModel) {
  return db
    .update(todoTable)
    .set({ name: todo.name, desc: todo.desc })
    .where(eq(todoTable.id, id));
}

export const todoQueries = {
  listarTODO,
  inserirTODO,
  obterTodoId,
  deleteTODO,
  updateTodo,
};
