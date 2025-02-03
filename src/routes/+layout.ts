import { parseApiRoute } from '$lib';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ route, fetch }) => {
	const includedRoutes = ['/', '/pricing', '/features', '/about'];

	let redirectTo: undefined | string = undefined;
	const response = await fetch(parseApiRoute('/auth/check-session'), {
		credentials: 'include',
		method: 'GET'
	});

	if (response.ok && includedRoutes.includes(route.id)) {
		redirectTo = '/dashboard/';
	}
	return {
		isExcludedLayout: !route.id || !includedRoutes.includes(route.id!.toString()),
		redirectTo
	};
};
