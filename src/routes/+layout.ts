import { parseApiRoute } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ route, fetch }) => {
	const includedRoutes = ['/', '/pricing', '/features', '/about'];
	const nonAuthRoutes = ['/', '/pricing', '/features', '/about', '/auth', '/auth/register'];

	const response = await fetch(parseApiRoute('/auth/check-session'), {
		credentials: 'include',
		method: 'GET'
	});

	const matchId = route.id?.match(/\/([0-9]|[a-zA-Z]{7})(?!dashboard)/);
	console.log(matchId);
	if (response.ok && includedRoutes.includes(route.id!)) {
		redirect(303, '/dashboard/');
	} else if (!response.ok && !nonAuthRoutes.includes(route.id!)) {
		if (matchId) {
			redirect(303, '/');
		}
	}

	return {
		isExcludedLayout: !route.id || !includedRoutes.includes(route.id!.toString())
	};
};
