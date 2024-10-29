<script lang="ts">
  import type {Todo} from '$lib/server/schema';
  interface Props {
    todos: Todo[]
  }

  let {todos} : Props = $props();

</script>

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
      {#each todos as todo (todo.id)}
      <tr>
        <th>{todo.id}</th>
        <th>{todo.name}</th>
        <th>{todo.desc}</th>
      </tr>
      {/each}
    </tbody>
  </table>
</div>