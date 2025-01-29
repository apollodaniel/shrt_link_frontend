import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ route }) => {
	const includedRoutes = ['/', '/pricing', '/features', '/about'];

	return {
		isExcludedLayout: !route.id || !includedRoutes.includes(route.id!.toString())
	};
};
