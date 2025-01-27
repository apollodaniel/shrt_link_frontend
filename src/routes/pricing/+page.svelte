<script>
	import { Button, Card } from '@sveltestrap/sveltestrap';
</script>

<main>
	<Card class="p-5">
		<h2>Free Forever</h2>
		<p>
			No subscriptions. No trial periods.
			<br />

			Just <strong>free URL shortening</strong>, always.
		</p>

		<div class="benefits-container">
			<h6>What you get</h6>
			<ul>
				<li><small>Unlimited URL Shortening</small></li>
				<li><small>Analytics to Track Link Performance</small></li>
			</ul>
		</div>

		<Button color="primary" class="mt-4" on:click={() => console.log('working')}
			>Get started now</Button
		>
	</Card>
</main>

<style>
	main {
		max-width: 650px;
		text-align: center;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.benefits-container {
		margin-block: 16px;
	}
</style>
