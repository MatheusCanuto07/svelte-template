import type { PageServerLoad, Actions } from "./$types";
import { todoQueries } from "$lib/server/controller/todo";
import { fail } from "@sveltejs/kit";

export const load = (async ({ depends }) => {
  //Se algo relacionado a essa dependência mudar (como um dado associado a "todos"), a função load será reexecutada
  depends("pagination");
  const todos = await todoQueries.obterTodoWithLimit(1,5);

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
} satisfies Actions;
