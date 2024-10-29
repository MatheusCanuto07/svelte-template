<script lang="ts">
	import { count } from './stores.js';
	import Incrementer from './Incrementar.svelte';
	import Decrementer from './Decrementar.svelte';
	import Resetter from './Resetter.svelte';
  import Decre from './Decre.svelte';
  //import { time } from './stores.js';
  import Decremente3 from './Decremente3.svelte';
  
	const formatter = new Intl.DateTimeFormat(
		'en',
		{
			hour12: true,
			hour: 'numeric',
			minute: '2-digit',
			second: '2-digit'
		}
	);
</script>
<!-- Qualquer nome que comece com $é assumido como se referindo a um valor de armazenamento. É efetivamente um caractere reservado — Svelte impedirá que você declare suas próprias variáveis ​​com um $prefixo. -->
<h1>The count is {$count}</h1>

<!-- <Incrementer />
<Decrementer />
<Resetter /> -->
<button onclick={count.increment}>+</button>
<button onclick={count.decrement}>-</button>
<button onclick={count.reset}>reset</button>

<!-- <h1>The time is {formatter.format($time)}</h1> -->