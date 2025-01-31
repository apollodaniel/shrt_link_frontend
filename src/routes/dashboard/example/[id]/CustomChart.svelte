<svelte:options customElement="custom-chart" />

<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	const {
		label,
		chartType,
		data,
		name,
		description,
		position = 'top',
		onClick = () => {}
	} = $props();

	onMount(async () => {
		const chart = new Chart(
			document.getElementById(`${name.toLowerCase().replace(' ', '-')}-clicks`),
			{
				type: chartType,
				data: {
					labels: label,
					datasets: [
						{
							label: description,
							data: data
						}
					]
				},
				options: {
					plugins: {
						legend: {
							display: true,
							position // Moves the legend to the right side
						}
					},
					onClick: (event, elements) => onClick(event, elements, chart)
				}
			}
		);
	});
</script>

<canvas id={`${name.toLowerCase().replace(' ', '-')}-clicks`}></canvas>

<style>
	canvas {
		margin: 0px;
		padding: 0px;
	}
</style>
