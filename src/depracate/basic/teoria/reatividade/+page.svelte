<script lang="ts">
  import { run } from 'svelte/legacy';

  let count = $state(0);
  //Variáveis dinâmicas
  let doubled = $derived(count * 2);

  //Funções dinâmicas
  run(() => {
    if (count >= 10) {
  		alert('count is dangerously high!');
  		count = 0;
  	}
  });

  let numbers = $state([1, 2, 3, 4]);

	function addNumber() {
		numbers = [...numbers, numbers.length + 1];
	}

  function increment() {
    count += 1;
  }
</script>

<div>
  <button onclick={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
  </button>

  <button onclick={addNumber}>
    Adicionar item array
  </button>

  {"O dobro da variável contadora é: " + doubled}
  {"Array de número: " + numbers}
</div>