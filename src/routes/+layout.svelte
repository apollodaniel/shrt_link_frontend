<script lang="ts">
	import { Button, Icon } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';

	const { data } = $props();
	let isNavVisible = $state(false);
</script>

{#if !data.isExcludedLayout}
	<nav class={isNavVisible ? 'visible' : ''}>
		<div class="logo">
			<h1 href="/">
				shrt <span>link</span>
			</h1>

			<button
				class="btn btn-primary opendrawer"
				onclick={() => (isNavVisible = !isNavVisible)}
				><Icon
					class="d-flex justify-content-center align-items-center fs-5 fw-normal"
					name="list"
				/></button
			>
		</div>
		<ul class={isNavVisible ? 'visible' : ''}>
			<li><a onclick={() => (isNavVisible = false)} href="/">Home</a></li>
			<li><a onclick={() => (isNavVisible = false)} href="/pricing">Pricing</a></li>
			<li><a onclick={() => (isNavVisible = false)} href="/features">Features</a></li>
			<li><a onclick={() => (isNavVisible = false)} href="/about">About</a></li>
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
	h1 {
		font-weight: bold;
	}

	h1 > span {
		font-weight: normal;
	}
	h1 {
		cursor: pointer;
	}

	.opendrawer {
		display: none;
	}

	@media (max-width: 650px) {
		.logo {
			width: 100%;
			height: 80px;
			justify-content: center;
			align-items: center;
			display: flex;
			z-index: 10;
			background-color: white;
			padding-top: 24px;
		}
		nav {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0px;
		}
	}
	@media (max-width: 510px) {
		.logo {
			position: absolute;
			top: 0px;
			justify-content: space-between;
			padding-inline: 32px;
		}
		.opendrawer {
			display: block;
			width: 48px;
			height: 48px;
		}
		ul {
			height: 150px;
			width: 250px;
			transition: top ease-in-out 500ms;
			top: 90px;
			position: absolute;
			text-align: end;
		}
		nav {
			height: 100px;
			transition: height ease-in-out 500ms;
		}
		nav.visible {
			height: 450px;
			justify-content: start;
			transition: height ease-in-out 500ms;
		}
		ul:not(.visible) {
			top: -150px;
		}
		nav > ul {
			flex-direction: column;
		}
	}
</style>
