<script lang="ts">
  import type { PageData } from './$types';

  function handleSubmit(){
    console.log("Login")
  }
  
  export let data: PageData;
  console.log(data)
</script>

<form on:submit|preventDefault={handleSubmit} >
  <h1>Bem vindo! Faça login para utilizar a plataforma</h1>
  <div>
    <label for="">E-mail</label>
    <input id="email" type="text" placeholder="Digite seu e-mail">
  </div>
  <div>
    <label for="">Senha</label>
    <input id="password" type="password" placeholder="Digite sua senha">
  </div>
  <button class="btn btn-wide" type="submit">
    Enviar
  </button>
  <div>
    {JSON.stringify(data.users, null,2)}
  </div>
</form>
