<script lang="ts">
  import type { PageData } from './$types';
  import {getRandomNumber} from './thing.svelte';
  
  export let data: PageData;
  
  let count = 0;
  
  function increment() {
    count += 1;
  }

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = colors[0];

  import Thing from './thing.svelte';

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];

	function handleClick() {
		things = things.slice(1);
	}
  
	function handleClick2() {
    promise = getRandomNumber();
	}
  let promise = getRandomNumber();

</script>

<div>
  <button on:click={increment}>
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
			on:click={() => selected = color}
		>{i + 1}</button>
	{/each}

  <button on:click={handleClick}>
    Remove first thing
  </button>
  
  {#each things as thing (thing.id)}
    <Thing name={thing.name} />
  {/each}

  <button on:click={handleClick2}>
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
