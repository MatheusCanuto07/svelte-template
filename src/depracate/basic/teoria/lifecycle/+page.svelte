<script>
	import { onMount } from 'svelte';
	import { paint } from './gradiente.js';
  import Tick from './tick.svelte'

	onMount(() => {
		const canvas = document.querySelector('canvas');
		const context = canvas?.getContext('2d');

		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<canvas
	width={32}
	height={32}
></canvas>

<!-- A tickfunção é diferente de outras funções de ciclo de vida, pois você pode chamá-la a qualquer momento, não apenas quando o componente inicializa pela primeira vez. Ela retorna uma promessa que é resolvida assim que quaisquer alterações de estado pendentes forem aplicadas ao DOM (ou imediatamente, se não houver alterações de estado pendentes). -->

<Tick />

<style>
	canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #666;
		mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		mask-size: 60vmin;
		-webkit-mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		-webkit-mask-size: 60vmin;
	}
</style> 

<!-- A beforeUpdatefunção agenda o trabalho para acontecer imediatamente antes do DOM ser atualizado. afterUpdateé sua contraparte, usada para executar código quando o DOM estiver sincronizado com seus dados. -->

