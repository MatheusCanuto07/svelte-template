<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  import { filters } from "./params.svelte";
  
  interface Props {
    data: PageData;
    form: ActionData;
  }
  
  let { data, form }: Props = $props();
  
  let {todos} = data;
  let todoList = $state(data.todos);
  //Toda vez que data.todos (dependencia do todoList) atualizar o todoList também deve ser atualizado
  $effect(() => {
    todoList = data.todos;
  });
  
  //let todoEdit = todoList.find((t) => t.id == todoIdEdit);
  //$: Quando alguma das variaveis que eu estou utilizando alterar a todoEdit também vai ser alterado
  //como eu estou utilizando constantes, o $ não faz nada
  let todoEdit: typeof todoList[0] = $state({
    id : 1,
    name : "",
    desc : ""
  });
  
  let updateForm : HTMLFormElement | undefined = $state();
  function handleUpdate(){
    //Se for undefined ele não executa nada
    updateForm?.requestSubmit();
  }
  
  let isLoading = $state(false);
  
  let deleteForm : HTMLFormElement | undefined = $state();
  let deleteId : number | undefined = $state();
  function handleDelete(id : number) {
    deleteId = id;
    //Executa o form e não atualiza a página
    //Se for undefined ele não executa nada
    deleteForm?.requestSubmit();
  }
  
  let searchTerm = $state("");
  //let filteredTodo = [];
  let filteredTodo : typeof todoList = $state(
  [{
    id : 0,
    name : "",
    desc : ""
  }]
  );
  
  const searchTodo = () => {
    return filteredTodo = todoList.filter((t) => t.name.includes(searchTerm) || t.desc.includes(searchTerm) 
    || t.id == Number(searchTerm))
  }
  
  let page = $state(1);
  let pageSize = $state(5);

  let full = [1,2,3,4]
  
  let editModal : HTMLDialogElement | undefined = $state();
</script>

<div>
  <!-- enhance -> funciona de acordo do dispositivo da pessoa  -->
  {#if form}
  <p class:bg-green-300={form.succes} class:bg-red-300={!form.succes}>
    {form.message}
  </p>
  {/if}
  <form method="POST" action="?/create"
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
      await invalidate("todoList");
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

<div class="mt-5 mb-1">
  <label for="search" class="mb-1">Pesquisar Tarefa</label>
  <input class="w-full h-10 mb-1" id="search" name="search" type="text" bind:value="{searchTerm}" oninput={searchTodo}>
</div>

<div class="overflow-x-auto"> 
  <table class="table">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>desc</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {#if filteredTodo.length == 0 && searchTerm != "" }
      <tr>
        <th>
          <p>Pesquisa não retornou resultados</p>
        </th>
      </tr>
      {:else if filteredTodo.length > 0 && searchTerm != ""}
      {#each filteredTodo as todo (todo.id)}
      <tr>
        <th>{todo.id}</th>
        <th>{todo.name}</th>
        <th>{todo.desc}</th>
        <th>
          <button class="bg-red-600 text-neutral-100 btn h-8" onclick={() => handleDelete(todo.id)}>
            Apagar
          </button>
        </th>
        <th>
          <button class="bg-yellow-400 text-neutral-100 btn h-8" onclick={() => {editModal?.showModal(); todoEdit = todo}}>
            Editar
          </button>
        </th>
      </tr>
      {/each}
      {:else}
      {#each todoList as todo (todo.id)}
      <tr>
        <th>{todo.id}</th>
        <th>{todo.name}</th>
        <th>{todo.desc}</th>
        <th>
          <button class="bg-red-600 text-neutral-100 btn h-8" onclick={() => handleDelete(todo.id)}>
            Apagar
          </button>
        </th>
        <th>
          <button class="bg-yellow-400 text-neutral-100 btn h-8" onclick={() => {editModal?.showModal(); todoEdit = todo}}>
            Editar
          </button>
        </th>
      </tr>
      {/each}
      {/if}
    </tbody>
  </table>

  <div class="flex justify-center items-center">
    <div class="join">
      <button onclick="{() => filters.update({page : (page + 1).toString()})}" class="join-item btn">«</button>
      <input class="join-item btn" type="number" name="page" id="page" value="{page}">
      <button class="join-item btn">»</button>
    </div>
    <div>
      <input class="input input-bordered w-12" type="number" name="pageSize" id="pageSize" value="{pageSize}">
    </div>
  </div>

</div>
</div>

<dialog bind:this={editModal} class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Editar tarefa</h3>
    <p class="">Pressione esc ou click no botão para fechar</p>
    <div class="mt-2">
      <form method="dialog">
        <div class="w-full flex">
          <div class="flex flex-col w-6/12">
            <label for="editNameTask">Nome da tarefa</label>
            <!-- todoList.find(aux => aux.id == deleteId -->
            <input class="w-full h-8 rounded" type="text" id="editNameTask" name="editNameTask" bind:value="{todoEdit.name}"/>
          </div>
          <div class="flex flex-col w-6/12 pl-3">
            <label for="editDescTask">Descrição da tarefa</label>
            <input class="w-full h-8 rounded" type="text" id="editDescTask" name="editDescTask" bind:value="{todoEdit.desc}"/>
          </div>
        </div>
        <div class="w-full flex justify-end">
          <div class="mt-2">
            <button class="btn w-2-12">Close</button>
          </div>
          <div class="mt-2">
            <button class="btn btn-success w-2-12" onclick={handleUpdate}>Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</dialog>

<form style="display: none;" bind:this={deleteForm} method="POST" action="?/delete"
use:enhance={({
  formData
}) => {
  formData.set("idTask", deleteId);
}}
>
<input type="number" id="idTask" name="idTask" bind:value={deleteId} />
</form>

<form style="display: none;" bind:this={updateForm} method="POST" action="?/update"
use:enhance={({
  formData
}) => {
  formData.set("idEdit", todoEdit?.id)
  formData.set("nameEdit", todoEdit?.name)
  formData.set("descEdit", todoEdit?.desc)
  searchTerm = "";
}}>
</form>

