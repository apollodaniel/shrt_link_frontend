import { parseApiRoute } from '$lib';
import type { ErrorEntry } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch(parseApiRoute(`/urls/${params.id}/summary`), {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.ok) {
		const urlSummary = await response.json();
		console.log(urlSummary);
		return {
			urlSummary: {
				...urlSummary,
				url: {
					...urlSummary.url,
					creationDate: new Date(urlSummary.url.creationDate)
				}
			}
		};
	}

	const errorEntry: ErrorEntry = await response.json();

	return {
		status: response.status,
		error: new Error(errorEntry.message)
	};
};
