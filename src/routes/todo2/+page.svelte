<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  import TodoCreate from "./TodoCreate.svelte";
  import TodoList from "./TodoList.svelte";
  import TodoSearch from "./TodoSearch.svelte";
  import type { Todo } from "$lib/server/schema";
  import { filters } from "./params.svelte";
  export type {Pagination};
  interface Pagination {
    page: number;
    itemsPerPage: number;
  }
  // TODO: Fazer o filtro dos dados no servidor e devolver os valores filtrados
  // TODO: Fazer paginação nos dados, página 1,2 com 10 ou mais itens cada uma
  // TODO: Componentizar (Colocar a parte de editar componente como um componente)
  interface Props {
    data: PageData;
    form: ActionData;
  }
  
  let pagination : Pagination = $state({
    page : 1,
    itemsPerPage : 5
  })
  
  let { data, form }: Props = $props();
  let search = $state("");
  let searchParams : string | null = "";
  //Faz com que toda vez que qualquer variavel dentro de um $derived(aqui), a função seja executada novamente 
  //Quando alguma das dependencias de filteredTodos atualizar o valor dela também vai ser atualizado
  let filteredTodos = $derived(data.todos.filter(filterTodos));
  
  function filterTodos(t: Todo){
    if(search){
      return t.name.includes(search) || t.desc.includes(search) || t.id == Number(search)
    } else{
      return true
    }
  }
  
  function changeUrl(){
    searchParams = filters.get(search);
    console.log(searchParams)
    filters.update({search : search})
  }

  $inspect(pagination.itemsPerPage, pagination.page);
</script>

<div class="w-full">
  <input class="w-full h-8" type="text" bind:value={search} oninput={changeUrl}>
</div>

<TodoCreate />

<TodoList todos={filteredTodos} bind:pagination={pagination} />