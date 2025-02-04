<svelte:options customElement="last-month-chart" />

<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	const { countByDay, position = 'top' } = $props();
	const now = new Date();

	const last30Days = [];

	countByDay.forEach(({ day, count }) => {
		const date = new Date(day);
		const countNum = parseInt(count, 10);

		// Get last 30 days
		if ((now - date) / (1000 * 60 * 60 * 24) <= 30) {
			last30Days.push({ date, count: countNum });
		}
	});
	const last30Labels = last30Days.map(({ date }) => date.toISOString().split('T')[0]);
	const last30Counts = last30Days.map(({ count }) => count);
	onMount(async () => {
		new Chart(document.getElementById('last-month-clicks'), {
			type: 'bar',
			data: {
				labels: last30Labels,
				datasets: [
					{
						label: 'Last 30 Days',
						data: last30Counts,
						backgroundColor: 'rgba(54, 162, 235, 0.7)'
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					x: { stacked: false },
					y: { stacked: false, ticks: { precision: 0 } }
				},
				plugins: {
					legend: {
						display: true,
						position // Moves the legend to the right side
					}
				}
			}
		});
	});
</script>

<canvas id="last-month-clicks"></canvas>
