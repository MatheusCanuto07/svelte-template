<script lang="ts">
  let count = 0;
  //Variáveis dinâmicas
  $: doubled = count * 2;

  //Funções dinâmicas
  $: if (count >= 10) {
		alert('count is dangerously high!');
		count = 0;
	}

  let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers = [...numbers, numbers.length + 1];
	}

  function increment() {
    count += 1;
  }
</script>

<div>
  <button on:click={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
  </button>

  <button on:click={addNumber}>
    Adicionar item array
  </button>

  {"O dobro da variável contadora é: " + doubled}
  {"Array de número: " + numbers}
</div>