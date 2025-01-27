<script>
	import { Button, Card, CardBody, CardHeader } from '@sveltestrap/sveltestrap';
</script>

<main>
	<script>
		import { Card, CardBody, CardHeader } from '@sveltestrap/sveltestrap';
	</script>

	<Card>
		<CardBody>
			<h2>Our Mission: Simplifying the Internet, One Link at a Time</h2>
			<p>
				We started with a simple goal: to make sharing links easier for everyone. Whether
				you're a marketer, content creator, or just someone who loves sharing cool stuff
				online, we’re here to help.
			</p>

			<h2>We value</h2>
			<ul>
				<li>Simplicity: Making long URLs short and sweet.</li>
				<li>Reliability: Ensuring your links are always up and running.</li>
				<li>Privacy: Keeping your data safe and secure.</li>
			</ul>
		</CardBody>
	</Card>
</main>

<style>
	main {
		max-width: 650px;
		text-align: center;
		gap: 32px;
		display: flex;
		flex-direction: column;
	}

	ul {
		text-align: start;
		max-width: 450px;
		margin-inline: auto;
	}
	h3 {
		margin-top: 32px;
	}
</style>
