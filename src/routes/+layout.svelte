<script lang="ts">
  import type { LayoutData } from './$types';
  import Nav from '../lib/client/components/nav/+page.svelte'
  import Page from './+page.svelte';
  import "../app.css";
  
  interface Props {
    data: LayoutData;
    children?: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();
</script>

<Nav></Nav>
<div class="container-lg px-10">
  {#if children}
    {@render children()}    
  {/if}
</div>