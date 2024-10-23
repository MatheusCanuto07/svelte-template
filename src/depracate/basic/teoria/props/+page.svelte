<script>
	import Nested from './props.svelte';
  import Objeto from './objeto.svelte';

  const pkg = {
		name: 'svelte',
		speed: 'blazing',
		version: 4,
		website: 'https://svelte.dev'
	};
</script>

<Nested answer={42} />
<Objeto {...pkg}/>
