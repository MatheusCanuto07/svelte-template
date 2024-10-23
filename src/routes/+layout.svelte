<script lang="ts">
  import type { LayoutData } from './$types';
  import Nav from '../lib/client/components/nav/+page.svelte'
  import Page from './+page.svelte';
  import "../app.css";
  
  export let data: LayoutData;
</script>

<Nav></Nav>
<div class="container-lg px-10">
  <slot>
    
  </slot>
</div>