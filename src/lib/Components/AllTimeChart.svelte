<svelte:options customElement="all-time-chart" />

<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	const { countByDay, position = 'top' } = $props();

	const yearlyData = {};

	countByDay.forEach(({ day, count }) => {
		const date = new Date(day);
		const countNum = parseInt(count, 10);

		const yearKey = `${date.getFullYear()}`;
		if (!yearlyData[yearKey]) {
			yearlyData[yearKey] = 0;
		}
		yearlyData[yearKey] += countNum;
	});

	const yearLabels = Object.keys(yearlyData);
	const yearCounts = Object.values(yearlyData);
	onMount(async () => {
		new Chart(document.getElementById('all-time-clicks'), {
			type: 'bar',
			data: {
				labels: yearLabels,
				datasets: [
					{
						label: 'Click count',
						data: yearCounts
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

<canvas id="all-time-clicks"></canvas>
