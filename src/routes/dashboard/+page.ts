import { parseApiRoute } from '$lib';
import type { ErrorEntry, UrlGeneralSummary } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(parseApiRoute('/url/summary'), {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	console.log(response);
	if (response.ok) {
		const urlSummary = await response.json();
		console.log(urlSummary);
		return {
			urlSummary
		};
	}

	const errorEntry: ErrorEntry = await response.json();

	return {
		status: response.status,
		error: new Error(errorEntry.message)
	};
};
