<script lang="ts">
	import { once } from 'svelte/legacy';

  import type { PageData } from './$types';
  import Inner from './Inner.svelte';

  let m = $state({ x: 0, y: 0 });

  //Tipo de parâmetro e tipo de retorno
	function handleMove(event: MouseEvent): void {
    m.x = event.clientX;
    m.y = event.clientY;
  }

	function handleMessage(event: CustomEvent<{ text: string}>) : void{
		alert(event.detail.text);
	}
    

  import BigRedButton from './BigRedButton.svelte';
	import horn from './horn.mp3';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const audio = new Audio();
	audio.src = horn;

	function handleClick() {
		audio.load();
		audio.play();
	}
</script>

<Inner on:message={handleMessage} />

<div onpointermove={handleMove}>
	The pointer is at {m.x} x {m.y}
</div>

<!-- Função inline -->
<div onpointermove={(e) => {
  m = {x: e.clientX, y : e.clientY};
}}>
</div>

<!-- preventDefault— chamadas event.preventDefault()antes de executar o manipulador. Útil para manipulação de formulários do lado do cliente, por exemplo.
stopPropagation— chamadas event.stopPropagation(), impedindo que o evento chegue ao próximo elemento
passive— melhora o desempenho de rolagem em eventos de toque/roda (o Svelte adicionará isso automaticamente quando for seguro fazê-lo)
nonpassive— explicitamente definidopassive: false
capture— dispara o manipulador durante a fase de captura em vez da fase de borbulhamento
once— remova o manipulador após a primeira execução
self— somente aciona o manipulador se event.target for o próprio elemento
trusted— somente o manipulador de gatilho event.isTrustedé true, o que significa que o evento foi disparado por uma ação do usuário e não porque algum JavaScript foi chamadoelement.dispatchEvent(...) -->
<!-- Modificador de evento, só vai ter o alert uma vez -->
 <!-- É possível combinar vários modificadores, basta adicionar a | -->
<button onclick={once(() => alert('clicked'))}>
	Click me
</button>


<style>
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>

