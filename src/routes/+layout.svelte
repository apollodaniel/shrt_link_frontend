<script lang="ts">
	import { Button } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';

	const { data } = $props();
</script>

{#if !data.isExcludedLayout}
	<nav>
		<h1 href="/">
			shrt <span>link</span>
		</h1>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/pricing">Pricing</a></li>
			<li><a href="/features">Features</a></li>
			<li><a href="/about">About</a></li>
			<Button
				class="ms-3"
				color="primary"
				on:click={() => window.open('/auth/register', '_self')}>Register now</Button
			>
		</ul>
	</nav>
{/if}
<div class={!data.isExcludedLayout ? 'slot-container included-layout' : 'slot-container'}>
	<slot />
</div>

<style>
	nav {
		padding: 8px;
		padding-inline: 32px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		/* background: gray; */
	}

	.include-layout {
		margin: auto;
	}
	.slot-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	nav > ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-block: auto;
		height: 100%;
		gap: 12px;
		list-style: none;
	}

	a {
		text-decoration: none;
		color: black;
	}
	a:hover {
		text-decoration: none;
		color: #0d6efd;
	}
	nav > h1 {
		font-weight: bold;
	}

	nav > h1 > span {
		font-weight: normal;
	}
	nav > h1 {
		cursor: pointer;
	}
</style>
