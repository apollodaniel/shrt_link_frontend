<svelte:options customElement="side-bar" />

<script>
	import { Accordion, AccordionItem, Button, Icon } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';

	let { urls = [] } = $props();

	let width = $state(900);

	let showSidebar = $state(false);
	let backgroundColor = $state('white');
	onMount(() => {
		function updateWidth() {
			width = window.innerWidth;
		}
		backgroundColor = getComputedStyle(document.body).backgroundColor;
		updateWidth();
		window.addEventListener('resize', updateWidth);

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});
</script>

<div
	class={`sidebar ${width < 900 ? 'floating' : ''} ${width < 900 && showSidebar ? 'visible' : ''}`}
	style={`background-color: ${backgroundColor}`}
>
	{#if width < 900}
		<div class="d-flex flex-column gap-1 align-items-end">
			<div id="close-drawer-icon">
				<Button
					color="light"
					class="w-100 h-100 d-flex justify-content-center align-items-center"
					on:click={() => (showSidebar = false)}
					><Icon
						class="d-flex justify-content-center align-items-center fw-normal"
						name="x-lg"
					/></Button
				>
			</div>
			<Button class="w-100" color="light">Home</Button>
		</div>
	{:else}
		<Button color="light" href="/dashboard/example/">Home</Button>
	{/if}

	<h4>Url List</h4>
	<div class="d-flex flex-column gap-1">
		{#each urls as url}
			<Button
				color="light"
				target="_self"
				href="/dashboard/example/{url.id}"
				class="w-100 d-flex flex-column gap-2"
				><h6 class="m-0 p-0">{url.id}</h6>
				<p class="m-0 p-0">{url.originalUrl}</p></Button
			>
		{/each}
	</div>
</div>

{#if width < 900}
	<div id="open-drawer-icon" class={!showSidebar ? 'visible' : ''}>
		<Button
			color="light"
			class="w-100 h-100 d-flex justify-content-center align-items-center"
			on:click={() => (showSidebar = true)}
			><Icon
				class="d-flex justify-content-center align-items-center fs-5 fw-normal"
				name="list"
			/>
		</Button>
	</div>
{/if}

<style>
	.sidebar {
		padding: 8px;
		width: 300px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: start;
		gap: 8px;
		position: relative;
		border-right-color: gray;
		border-right: solid;
		border-right-width: 1px;
		overflow-y: scroll;
	}

	.sidebar.floating {
		position: fixed;
		top: 0;
		bottom: 0;
		left: -300px;
		transition: left ease-in-out 500ms;
		z-index: 10;
	}

	.sidebar.floating.visible {
		width: 300px;
		left: 0;
	}

	#close-drawer-icon {
		height: 36px;
		width: 36px;
		aspect-ratio: 1/1;
	}
	#open-drawer-icon {
		position: fixed;
		top: 8px;
		left: 16px;
		width: 0;
		height: 48px;
		width: 48px;
		aspect-ratio: 1/1;
		opacity: 0;
	}
	#open-drawer-icon.visible {
		opacity: 1;
	}
</style>
