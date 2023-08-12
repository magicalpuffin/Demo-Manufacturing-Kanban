import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
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
			return {
				kanbanLocations: await location_response.json(),
				kanbanParts: await part_response.json(),
				kanbanWorkorders: await workorder_response.json()
			};
		} else {
			console.log('Failed to fetch workorders');
		}
	} catch (error) {
		console.log(error);
	}
}) satisfies PageLoad;
