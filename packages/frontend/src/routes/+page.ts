import type { PageLoad } from './$types';

import type { LocationDetailSelect, WorkOrderDetailSelect, PartSelect } from '$lib/types';

import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ fetch }) => {
	let locationDetailList: LocationDetailSelect[] = [];
	let workOrderDetailList: WorkOrderDetailSelect[] = [];
	let partList: PartSelect[] = [];

	try {
		// fetching kanban board data
		const response = await fetch(`${PUBLIC_API_URL}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			let data = await response.json();
			locationDetailList = data.locations;
			workOrderDetailList = data.workorders;
			partList = data.parts;
		} else {
			console.log('Failed to fetch workorders');
		}
	} catch (error) {
		console.log(error);
	}

	return {
		locationDetailList,
		workOrderDetailList,
		partList
	};
}) satisfies PageLoad;
