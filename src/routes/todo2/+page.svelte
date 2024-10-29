<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  import TodoCreate from "./TodoCreate.svelte";
  import TodoList from "./TodoList.svelte";
  import type { Todo } from "$lib/server/schema";
  
  interface Props {
    data: PageData;
    form: ActionData;
  }

  // TODO: Fazer o filtro dos dados no servidor e devolver os valores filtrados
  // TODO: Fazer paginação nos dados, página 1,2 com 10 ou mais itens cada uma
  // TODO: Componentizar (Colocar a parte de editar componente como um componente)
  
  let { data, form }: Props = $props();
  let search = $state("");
  //Faz com que toda vez que qualquer variavel dentro de um $derived(aqui), a função seja executada novamente 
  //Quando alguma das dependencias de filteredTodos atualizar o valor dela também vai ser atualizado
  let filteredTodos = $derived(data.todos.filter(filterTodos));

  function filterTodos(t: Todo){
    if(search == "")
      return true
    return t.name.includes(search) || t.desc.includes(search) || t.id == Number(search)
  }
  
</script>

<input type="text" bind:value={search}>

<TodoCreate />

<TodoList todos={filteredTodos} />