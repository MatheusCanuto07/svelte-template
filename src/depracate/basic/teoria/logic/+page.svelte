<script lang="ts">
  import type { PageData } from './$types';
  import {getRandomNumber} from './thing.svelte';
  
  
  let count = $state(0);
  
  function increment() {
    count += 1;
  }

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = $state(colors[0]);

  import Thing from './thing.svelte';
  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

	let things = $state([
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	]);

	function handleClick() {
		things = things.slice(1);
	}
  
	function handleClick2() {
    promise = getRandomNumber();
	}
  let promise = $state(getRandomNumber());

</script>

<div>
  <button onclick={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
  </button>
  
  {#if count > 10}
  <p>{count} is greater than 10</p>
  {:else if count < 5}
  <p>{count} is less than 5</p>
  
  {:else}
  <p>{count} is between 0 and 10</p>
  {/if}

  {#each colors as color, i}
		<button
			aria-current={selected === color}
			aria-label={color}
			style="background: {color}"
			onclick={() => selected = color}
		>{i + 1}</button>
	{/each}

  <button onclick={handleClick}>
    Remove first thing
  </button>
  
  {#each things as thing (thing.id)}
    <Thing name={thing.name} />
  {/each}

  <button onclick={handleClick2}>
    generate random number
  </button>
  
  {#await promise}
    <p>...waiting</p>
  {:then number}
    <p>The number is {number}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
