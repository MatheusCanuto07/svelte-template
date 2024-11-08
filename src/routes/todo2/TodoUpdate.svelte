<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Todo } from "$lib/server/schema";

  interface Props{
    todo : {
      id : number,
      name : string,
      desc : string
    }
  }

  let {todo} : Props = $props()
  let editModal : HTMLDialogElement;

  export function activeModal(){
    editModal.showModal();
  }

  function handleModal(){
    editModal.close();
  }

</script>

<dialog bind:this={editModal} class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Editar tarefa</h3>
    <p class="">Pressione esc ou click no botão para fechar</p>
    <div class="mt-2">
      <form method="POST" use:enhance>
        <div class="w-full flex">
          <div class="flex flex-col w-6/12">
            <label for="nameEdit">Nome da tarefa</label>
            <!-- todoList.find(aux => aux.id == deleteId -->
            <input class="w-full h-8 rounded" type="text" id="nameEdit" name="nameEdit" value="{todo.name}"/>
          </div>
          <div class="flex flex-col w-6/12 pl-3">
            <label for="descEdit">Descrição da tarefa</label>
            <input class="w-full h-8 rounded" type="text" id="descEdit" name="descEdit" value="{todo.desc}"/>
          </div>
        </div>
        <div class="w-full flex justify-end">
          <div class="mt-2">
            <button type="button" onclick="{handleModal}" class="btn w-2-12">Close</button>
          </div>
          <div class="mt-2">
            <button onclick="{handleModal}" class="btn btn-success w-2-12" formaction="/todo2/{todo.id}?/update">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</dialog>