<script>
	const emojis = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

	
	/**
	 * @typedef {Object} Props
	 * @property {any} name - the name is updated whenever the prop value changes...
	 */

	/** @type {Props} */
	let { name } = $props();

	// ...but the "emoji" variable is fixed upon initialisation
	// of the component because it uses `const` instead of `$:`
	const emoji = emojis[name];

  export async function getRandomNumber() {
    // Fetch a random number between 0 and 100
    // (with a delay, so that we can see it)
    const res = await fetch('/random-number');

    if (res.ok) {
        return await res.text();
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
  }
</script>

<p>{emoji} = {name}</p>