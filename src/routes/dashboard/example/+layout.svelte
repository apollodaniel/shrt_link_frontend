<script lang="ts">
	import Sidebar from './sidebar.svelte';
</script>

<main>
	<Sidebar
		urls={[
			{
				id: 'N3LW513',
				originalUrl: 'https://facebook.com',
				creationDate: new Date('2025-01-29T20:27:55.294Z')
			},
			{
				id: 'K35W31H',
				originalUrl: 'https://google.com',
				creationDate: new Date('2025-01-29T20:27:55.294Z')
			}
		]}
	/>
	<div id="summary-content" class="w-100 h-100">
		<slot />
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: start;
		justify-content: start;
		gap: 8px;
	}

	#summary-content {
		overflow-y: scroll;
		padding-top: 16px;

		padding-left: 32px;
		padding-right: 48px;
	}
	@media (max-width: 900px) {
		#summary-content {
			padding-top: 64px;

			padding-inline: 16px;
		}
	}
</style>
