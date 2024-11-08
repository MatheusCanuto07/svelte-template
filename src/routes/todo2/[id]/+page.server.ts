import type { PageServerLoad, Actions } from './$types';
import { todoQueries } from "$lib/server/controller/todo";
import { fail } from "@sveltejs/kit";

export const load = (async ({request, url, params}) => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  delete: async(event) => {
    // O método formData.get() sempre retorna um FormDataEntryValue, que é do tipo string ou File, então para garantir que id seja um Number, basta usar Number() ou parseInt().
    const id = parseInt(event.params.id);
    
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
    const idNewTask = parseInt(event.params.id)
    const formData = await event.request.formData();
    
    const newName = formData.get("nameEdit")?.toString();
    const newDesc = formData.get("descEdit")?.toString();
    
    if(typeof newName !== "string" || typeof newDesc !== "string"){
      return fail(404, {
        succes: false,
        message: "Invalide name or description"
      })
    }
    
    try{
      await todoQueries.updateTodo(idNewTask, {
        name : newName,
        desc : newDesc
      });
      return {
        succes: true,
        message: "Atualizaou"
      }     
    }
    catch(e){
      console.error(e, 404)
    }
  }
};