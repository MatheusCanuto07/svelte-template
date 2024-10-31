<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from "$app/forms";

  let handleForm = $props();
</script>

<!-- <h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input type="text" name="username" id="username"/>
  <br />  
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  <br>

	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
  
	<input type="submit" />
</form> -->

<div class="font-[sans-serif]">
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="p-8 rounded-2xl bg-white shadow">
        <h2 class="text-gray-800 text-center text-2xl font-bold">Cadastro</h2>
        <form class="mt-8 space-y-4" method="POST" action="/signup?">
          <div>
            <label for="username">Nome do usuário</label>
            <div class="relative flex items-center">
              <input id="username" name="username" type="text" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter user name" />
            </div>
          </div>

          <div>
            <label for="email" class="text-gray-800 text-sm mb-2 block">Email</label>
            <div class="relative flex items-center">
              <input id="email" name="email" type="text" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Digite seu e-mail" />
            </div>
          </div>

          <div>
            <label for="password" class="text-gray-800 text-sm mb-2 block">Senha</label>
            <div class="relative flex items-center">
              <input id="password" name="password" type="password" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
          
          <div class="flex justify-center">
            <button type="submit" class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
              Enviar
            </button>
          </div>

          <div class="flex justify-center">
            <p class="text-gray-800 text-sm">
              Já possui uma conta ?
            </p>
            <a href="/login">
              <p class="text-blue-700 text-sm text-center ms-2">
                Fazer login 
              </p>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
