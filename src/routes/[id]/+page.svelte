<script>
	import { parseRoute } from '$lib';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		console.log('Redirecting to:', parseRoute('/' + data.id)); // Debugging
		window.open(parseRoute('/' + data.id), '_self');
	});
</script>

<main>
	<h3>Loading your URL...</h3>
</main>
