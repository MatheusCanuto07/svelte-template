import type { PageServerLoad, Actions } from "./$types";
import { todoQueries } from "$lib/server/controller/todo";
import { fail } from "@sveltejs/kit";

export const load = (async ({ depends, url }) => {
  //Se algo relacionado a essa dependência mudar (como um dado associado a "todos"), a função load será reexecutada
  depends("todoList");
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get("page")|| "1") 
  const pageSize = parseInt(searchParams.get("pageSize")|| "5") 

  const todos = await todoQueries.obterTodoWithLimit(page, pageSize);

  return {
    todos,
  };
}) satisfies PageServerLoad;

export const actions = {
  create: async (event) => {
    const formData = await event.request.formData();
    const name = formData.get("nameTask");
    const desc = formData.get("descTask");

    if (typeof name !== "string" || name.length < 1) {
      console.error("Name is not valid");
      return fail(404, {
        succes: false,
        message: "Name is not valid",
      });
    }

    if (typeof desc !== "string" || desc.length < 1) {
      console.error("desc is not valid");

      return fail(404, {
        succes: false,
        message: "desc is not valid",
      });
    }
    try {
      await todoQueries.inserirTODO({
        name: name,
        desc: desc,
      });

      return {
        succes: true,
        message: "Task created",
      };
   
    } catch (e: any) {
      return fail(404, {
        succes: false,
        message: e.message ?? "Unknow error",
      });
    }
  },
  delete: async(event) => {
    const formData = await event.request.formData();
    // O método formData.get() sempre retorna um FormDataEntryValue, que é do tipo string ou File, então para garantir que id seja um Number, basta usar Number() ou parseInt().
    const id = formData.get("idTask");

    try{
      const resp = 
      await todoQueries.deleteTODO(id);
      return {
        succes: true,
        message: "Apagou"
      }
    } catch (e: any){
      return fail(404, {
        succes: false,
        message: e.message ?? "Unknow error",
      });
    }
  },
  update: async(event) => {
    const formData = await event.request.formData();

    const newName = formData.get("nameEdit");
    const newDesc = formData.get("descEdit");
    const idNewTask = formData.get("idEdit")

    try{
      console.log(idNewTask)
      console.log(newName)
      console.log(newDesc)
      console.log( await todoQueries.updateTodo(idNewTask, {
        name : newName,
        desc : newDesc
      })
    );
      
    }
    catch(e){
      console.error(e, 404)
    }
  }
} satisfies Actions;
