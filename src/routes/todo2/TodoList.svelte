<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidate } from '$app/navigation';
  import type {Todo} from '$lib/server/schema';
  import TodoUpdate from './TodoUpdate.svelte';
  import type {Pagination} from './+page.svelte';
  import {filters} from './params.svelte';
  interface Props {
    todos: Todo[],
    pagination: Pagination
  }
  
  let {todos, pagination = $bindable()} : Props = $props();
  let todoUpdate : Todo = $state(
    {
      id : 1,
      name : "",
      desc : "" 
    }
  );
  
  let todoDialog : HTMLDialogElement | null = $state(null)

  function handleModal(){
    if(todoDialog !== null)
      todoDialog.activeModal();

    //fetch('/api', {method: ""})
  }

  let isLoading = false;

</script>

<div class="overflow-x-auto"> 
  <form method="POST"
  use:enhance={({
    action,
    cancel,
    controller,
    formData,
    formElement,
    submitter,
  }) => {
    isLoading = true;
    
    return async () => {
      // inicio part 2
      // Se algo relacionado a essa dependência mudar (como um dado associado a "todos"), a função load será reexecutada
      await invalidate("todoList2");
      isLoading = false;
      // fim part 2
    };
  }}>
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
        {#each todos as todo (todo.id)}
        <tr>
          <th>{todo.id}</th>
          <th>{todo.name}</th>
          <th>{todo.desc}</th>
          <th>
            <button class="btn btn-error" formaction="/todo2/{todo.id}?/delete">
              Delete
            </button>
          </th>
          <th>
            <button onclick="{() => {todoUpdate = todo; handleModal()}}" type="button" class="btn btn-accent">
              Update
            </button>
          </th>
        </tr>
        {/each}
      </tbody>
    </table>
    <div class="flex justify-end">
      <div class="flex ">
        <p>Página</p>
        <button type="button" onclick="{() => pagination.page + 1}">+</button>
        <input type="number" bind:value="{pagination.page}" class="w-7 ms-2">
        <button onclick="{() => pagination.page - 1}">-</button>
      </div>
      <div class="flex">
        <p class="ms-2">Itens por página</p>
        <input type="number" bind:value="{pagination.itemsPerPage}" class="w-7 ms-2">
      </div>
    </div>
  </form>
</div>