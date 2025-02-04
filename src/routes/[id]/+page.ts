import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { parseRoute } from '$lib';

export const load: PageLoad = ({ params }) => {
	redirect(303, parseRoute('/' + params.id));
};
