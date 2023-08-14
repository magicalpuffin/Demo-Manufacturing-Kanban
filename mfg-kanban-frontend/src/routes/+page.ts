import type { PageLoad } from './$types';
import type { LocationType, PartType, WorkOrderType } from '$lib/types';

export const load = (async ({ fetch }) => {
	let kanbanLocations: LocationType[] = [];
	let kanbanParts: PartType[] = [];
	let kanbanWorkorders: WorkOrderType[] = [];

	try {
		const location_response = await fetch('http://localhost:8000/kanban-api/location/list/', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		const part_response = await fetch('http://localhost:8000/kanban-api/part/list/', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		const workorder_response = await fetch('http://localhost:8000/kanban-api/workorder/list/', {
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
