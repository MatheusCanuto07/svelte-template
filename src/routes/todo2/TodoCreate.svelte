<script>
  import {enhance} from '$app/forms'
  import {invalidate} from '$app/navigation'

  let isLoading = false;
</script>

<form method="POST" action="/todo2?/create"
  use:enhance={({
    action,
    cancel,
    controller,
    formData,
    formElement,
    submitter,
  }) => {
    //Será executado imediatamente antes do formulário ser enviado e (opcionalmente) retorne um retorno de chamada que seja executado com o ActionResult
    
    // inicio part 1
    // antes de enviar a request
    
    //Validações no front-end
    const name = formData.get("nameTask");
    const desc = formData.get("descTask");
    
    isLoading = true;
    // fim part 1
    
    return async () => {
      // inicio part 2
      // Se algo relacionado a essa dependência mudar (como um dado associado a "todos"), a função load será reexecutada
      await invalidate("todoList2");
      isLoading = false;
      // fim part 2
    };
  }}
  class="flex gap-10"
  >
  <div class="flex flex-col w-6/12">
    <label for="nameTask  ">Nome da tarefa</label>
    <input class="w-full h-8 rounded" type="text" id="nameTask" name="nameTask" />
  </div>
  <div class="flex flex-col w-4/12">
    <label for="descTask">Descrição da tarefa</label>
    <input class="w-full h-8 rounded" type="text" id="descTask" name="descTask" />
  </div>
  
  <button disabled={isLoading} class="bg-lime-800 text-zinc-50 w-2/12 h-8 self-end rounded">
    {isLoading ? "Enviando..." : "Enviar"}
  </button>
</form>