<script lang="ts">
	import type { UrlGeneralSummary } from '$lib/types';
	import { onMount } from 'svelte';
	import AllTimeChart from '$lib/Components/AllTimeChart.svelte';
	import LastMonthChart from '$lib/Components/LastMonthChart.svelte';
	import CustomChart from '$lib/Components/CustomChart.svelte';
	import { Button, Card, CardBody, CardHeader, Input } from '@sveltestrap/sveltestrap';
	import { parseApiRoute, REGEX_VALIDATORS } from '$lib';

	const { data } = $props();
	const urlSummary: UrlGeneralSummary = data.urlSummary;

	let position = $state('right');

	const updatePosition = () => {
		console.log('Resized ' + window.innerWidth);
		position = window.innerWidth > 900 ? 'right' : 'top'; // Update state on resize

		console.log('Resized ' + position);
	};

	onMount(() => {
		window.addEventListener('resize', updatePosition);

		return () => {
			window.removeEventListener('resize', updatePosition);
		};
	});

	let newUrl = $state('');

	async function shareUrl() {
		const response = await fetch(parseApiRoute('/urls/'), {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				originalUrl: newUrl
			})
		});

		if (response.ok) {
			window.open('/dashboard', '_self');
		}
	}
</script>

<h1>Home</h1>
<hr />

<Card>
	<CardHeader>
		<h4>Add new shortened url</h4>
	</CardHeader>
	<CardBody class="d-flex flex-row gap-3">
		<div class="d-flex flex-column gap-1 w-100">
			<Input
				invalid={(newUrl.match(REGEX_VALIDATORS.newUrl.regex) || []).length == 0 &&
					newUrl.length > 0}
				placeholder="Your amazing url"
				bind:value={newUrl}
				style="height: 64px;"
			/>
			{#if (newUrl.match(REGEX_VALIDATORS.newUrl.regex) || []).length == 0 && newUrl.length > 0}
				<div class="invalid-feedback">
					{REGEX_VALIDATORS.newUrl.errorMessage}
				</div>
			{/if}
		</div>

		<Button style="width: 120px; height: 64px;" on:click={shareUrl}>Short it</Button>
	</CardBody>
</Card>

<h3 class="mt-5">Summary</h3>

<p class="fs-5">
	Total clicks <b class="text-primary">{new Intl.NumberFormat().format(urlSummary.totalClicks)}</b
	>
</p>

{#if urlSummary.totalClicks > 0}
<div class="chart-list">
	<div class="chart-item">
		<h4>All Time clicks</h4>
		<AllTimeChart countByDay={urlSummary.countByDay} />
	</div>
	<div class="chart-item">
		<h4>Total clicks on last 30 days</h4>
		<LastMonthChart countByDay={urlSummary.countByDay} />
	</div>
	<div class="chart-item">
		<h4>Clicks by Hour of Day</h4>
		<CustomChart
			chartType="bar"
			data={urlSummary.countByTimeOfDay.map((row) => row.count)}
			label={urlSummary.countByTimeOfDay.map((row) => `${row.hour.padStart(2, '0')}:00`)}
			description="Total clicks for each hour"
			name="Hour"
		/>
	</div>
</div>
<div class="chart-list">
	<div class="chart-item">
		<h4>Total clicks by country</h4>
		{#key position}
			<CustomChart
				chartType="pie"
				data={urlSummary.countByCountry.map((row) => row.count)}
				label={urlSummary.countByCountry.map((row) => row.country)}
				description="Country click count"
				name="Country"
				{position}
			/>
		{/key}
	</div>
	<div class="chart-item">
		<h4>Total clicks by Browser</h4>
		{#key position}
			<CustomChart
				chartType="pie"
				data={urlSummary.countByBrowser.map((row) => row.count)}
				label={urlSummary.countByBrowser.map((row) => row.browser)}
				description="Browser click count"
				name="Browser"
				{position}
			/>
		{/key}
	</div>
	<div class="chart-item">
		<h4>Total clicks by Device</h4>
		{#key position}
			<CustomChart
				chartType="pie"
				data={urlSummary.countByDevice.map((row) => row.count)}
				label={urlSummary.countByDevice.map((row) => row.device)}
				description="Device click count"
				name="Device"
				{position}
			/>
		{/key}
	</div>
</div>
<div class="chart-item m-auto">
	<h4>Total clicks by url</h4>
	{#key position}
		<CustomChart
			chartType="pie"
			data={urlSummary.countByUrlId.map((row) => row.count)}
			label={urlSummary.countByUrlId.map((row) => row.urlId)}
			description="Url click count"
			name="Url"
			onClick={(event, elements, chart) => {
				if (elements.length > 0) {
					const clickedElementIndex = elements[0].index;
					const label = chart.data.labels[clickedElementIndex];

					window.open('/dashboard/' + label, '_self');
				}
			}}
			{position}
		/>
	{/key}
</div>
{/if}

<style>
	.chart-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}
	.chart-item {
		width: 32%;
		margin-top: 64px;
	}
	.large-chart-item {
		width: 450px;
	}

	h4 {
		margin: 0px;
	}
	@media (max-width: 1200px) {
		.chart-item {
			width: 50%;
		}
	}
	@media (max-width: 900px) {
		.chart-item {
			width: 100%;
		}

		.large-chart-item {
			width: 100%;
		}
	}
	.url {
		text-decoration: none;
	}

	.url:hover {
		text-decoration: underline;
	}
</style>
