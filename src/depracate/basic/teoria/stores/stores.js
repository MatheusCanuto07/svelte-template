// import { writable } from 'svelte/store';

// export const count = writable(0);
// import { readable } from 'svelte/store';

// export const time = readable(new Date(), function start(set) {
// 	const interval = setInterval(() => {
// 		set(new Date());
// 	}, 1000);

// 	return function stop() {
// 		clearInterval(interval);
// 	};
// });

// import { derived } from 'svelte/store';

// export const elapsed = derived(
// 	time,
// 	($time) => Math.round(($time - start) / 1000)
// );
import { writable } from "svelte/store";

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}