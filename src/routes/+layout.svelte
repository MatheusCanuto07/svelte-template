<script lang="ts">
  import type { LayoutData } from './$types';
  import Nav from '../lib/client/components/nav/Nav.svelte'
  import "../app.css";
  import {page} from '$app/stores';
  import LoginForm from '$lib/client/components/login/formLogin.svelte'
  import RegistroForm from '$lib/client/components/registro/RegistroForm.svelte';
  import { goto } from '$app/navigation';
  
  interface Props {
    data: LayoutData;
    children?: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();

  const userData = $page.data.user;
  
</script>

<Nav />
<div class="container-lg px-10">
  {@render children?.()}
</div>