import type { PageLoad } from './$types';
import type { LocationType, PartType, WorkOrderDetailType } from '$lib/types';
import { PUBLIC_KANBAN_API } from '$env/static/public';

export const load = (async ({ fetch }) => {
	let kanbanLocations: LocationType[] = [];
	let kanbanParts: PartType[] = [];
	let kanbanWorkorders: WorkOrderDetailType[] = [];

	try {
		const location_response = await fetch(`${PUBLIC_KANBAN_API}/location/list/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		const part_response = await fetch(`${PUBLIC_KANBAN_API}/part/list/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		const workorder_response = await fetch(`${PUBLIC_KANBAN_API}/workorder/list/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		if (location_response.ok && part_response.ok && workorder_response.ok) {
			kanbanLocations = await location_response.json();
			kanbanParts = await part_response.json();
			kanbanWorkorders = await workorder_response.json();
		} else {
			console.log('Failed to fetch location, part, or workorders');
		}
	} catch (error) {
		console.log(error);
	}

	return {
		kanbanLocations,
		kanbanParts,
		kanbanWorkorders
	};
}) satisfies PageLoad;
