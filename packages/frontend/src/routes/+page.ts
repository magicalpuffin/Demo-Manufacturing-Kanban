import type { PageLoad } from './$types';
import { workOrder, location, part } from '@Demo-Manufacturing-Kanban/core/schema';

import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ fetch }) => {
	type workOrderType = typeof workOrder.$inferSelect & {
		location: typeof location.$inferSelect;
	} & { part: typeof part.$inferSelect };

	let kanbanWorkorders: workOrderType[] = [];

	try {
		const workorderFetch = await fetch(`${PUBLIC_API_URL}/workorder`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		if (workorderFetch.ok) {
			kanbanWorkorders = await workorderFetch.json();
		} else {
			console.log('Failed to fetch workorders');
		}
	} catch (error) {
		console.log(error);
	}

	return {
		kanbanWorkorders
	};
}) satisfies PageLoad;
