import type { PageLoad } from './$types';

import { trpc } from '$lib/client';

export const load = (async ({ fetch }) => {
	const { workorders, locations, parts } = await trpc.listAll.query();
	return {
		workorders,
		locations,
		parts
	};
}) satisfies PageLoad;
