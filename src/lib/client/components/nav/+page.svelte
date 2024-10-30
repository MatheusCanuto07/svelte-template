<script lang="ts">
  import {page} from '$app/stores';
  const userData = $page.data.user;
</script>

<div class="navbar bg-base-100">
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content">
      <!-- Page content here -->
      <label for="my-drawer" class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <a href="/basic/teoria/reatividade">
            Reatividade
          </a>
        </li>
        <li>
          <a href="/basic/teoria/binding">
            binding
          </a>
        </li>
        <li>
          <a href="/basic/teoria/events">
            events
          </a>
        </li>
        <li>
          <a href="/basic/teoria/lifecycle">
            lifecycle
          </a>
        </li>
        <li>
          <a href="/basic/teoria/logic">
            logic
          </a>
        </li>
        <li>
          <a href="/basic/teoria/props">
            props
          </a>
        </li>
        <li>
          <a href="/basic/teoria/stores">
            stores
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="flex gap-5">
    {#if userData !== null}
			<form method="post" action="/logout">
        <p>Logado como : {userData.name}</p>
				<button type="submit" class="text-lg text-blue-800">
					<p class="text-primary-500">Sair</p>
				</button>
			</form>
		{:else}
			<a href="/login" class="text-lg text-blue-800">Login</a>
      <a href="/signup" class="text-lg text-blue-800"><p> Criar conta</p></a>
		{/if}
    <a href="https://svelte.dev/">
      <img class="h-10" src="svelteLogo.png" alt="">
    </a>
  </div>
</div>