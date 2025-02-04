<script lang="ts">
	import type { UrlSummary } from '$lib/types';
	import { onMount } from 'svelte';
	import AllTimeChart from '$lib/Components/AllTimeChart.svelte';
	import CustomChart from '$lib/Components/CustomChart.svelte';
	import LastMonthChart from '$lib/Components/LastMonthChart.svelte';
	import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
	import { parseApiRoute } from '$lib';

	const { data } = $props();
	const urlSummary: UrlSummary = data.urlSummary;

	let urlName = $state(urlSummary.url.id);
	let shortenedUrl = $state(urlSummary.url.originalUrl);

	let showDeletePopupModal = $state(false);

	let position = $state('right');

	const updatePosition = () => {
		console.log('Resized ' + window.innerWidth);
		position = window.innerWidth > 900 ? 'right' : 'top'; // Update state on resize

		console.log('Resized ' + position);
	};

	onMount(() => {
		urlName = `${document.location.host}/${urlSummary.url.id}`;
		shortenedUrl = `${window.location.href.replace(window.location.pathname, '')}/${urlSummary.url.id}`;
		window.addEventListener('resize', updatePosition);

		return () => {
			window.removeEventListener('resize', updatePosition);
		};
	});

	async function deleteUrl() {
		const response = await fetch(parseApiRoute(`/urls/${urlSummary.url.id}`), {
			method: 'DELETE',
			credentials: 'include'
		});

		if (response.ok) {
			window.open('/dashboard', '_self');
		}
	}
</script>

{#if showDeletePopupModal}
	<Modal isOpen={showDeletePopupModal}>
		<ModalHeader>
			<h2>Delete url</h2>
		</ModalHeader>
		<ModalBody>Are you sure you want to delete the url?</ModalBody>
		<ModalFooter>
			<Button color="danger" on:click={deleteUrl}>Delete</Button>
			<Button color="secondary" on:click={() => (showDeletePopupModal = false)}>Cancel</Button
			>
		</ModalFooter>
	</Modal>
{/if}

<div class="d-flex flex-row justify-content-between align-items-start">
	<h1>Url info</h1>
	<Button color="primary" style="height: 48px;" on:click={() => (showDeletePopupModal = true)}
		>Delete url</Button
	>
</div>
<hr />
<a class="fs-5 url" href={shortenedUrl}>{urlName}</a><br />
<a class="url" style="color: black;" href={urlSummary.url.originalUrl}
	>{urlSummary.url.originalUrl}</a
>

<p class="mt-4 fs-6">
	Created at {new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(urlSummary.url.creationDate)}
</p>

<h3 class="mt-5">Summary</h3>

<p class="fs-5">
	Total clicks <b class="text-primary">{new Intl.NumberFormat().format(urlSummary.totalClicks)}</b
	>
</p>
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
