import { parseApiRoute } from '$lib';
import type { ErrorEntry } from '$lib/types';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch(parseApiRoute('/urls/'), {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.ok) {
		const urls = await response.json();
		console.log(urls);
		return {
			urls
		};
	}

	const errorEntry: ErrorEntry = await response.json();
	return {
		status: response.status,
		error: new Error(errorEntry.message)
	};
};
