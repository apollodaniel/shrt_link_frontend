<script lang="ts">
	import { Button } from '@sveltestrap/sveltestrap';
</script>

<main>
	<h1>Shorten, Share, Simplify.</h1>
	<p class="mb-0">
		Transform long, clunky URLs into <b>compact</b>,
		<strong>shareable links in seconds</strong>.
	</p>

	<small class="mt-1">Free, Fast, and Reliable.</small>
	<Button color="primary" class="mt-4" href="/auth/register">Get started for free</Button>
</main>

<style>
	main {
		background-color: dark;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 8px;
		height: 100%;
	}

	img {
		margin-bottom: 16px;
	}
	small {
		font-style: italic;
	}
</style>
