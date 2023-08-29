import type { LocationType, WorkOrderDetailType } from '$lib/types';
import { PUBLIC_KANBAN_API } from '$env/static/public';

import { toast } from '@zerodevx/svelte-toast';

export async function onLocationCreate(
	partialLocation: Partial<LocationType>,
	kanbanLocations: LocationType[]
) {
	// console.log('onLocationCreate triggered', partialLocation);

	const response = await fetch(`${PUBLIC_KANBAN_API}/location/create/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(partialLocation)
	});
	if (response.ok) {
		let createdLocation: LocationType = await response.json();
		kanbanLocations = [...kanbanLocations, createdLocation];
		kanbanLocations = kanbanLocations.slice().sort((a, b) => a.sequence - b.sequence);

		toast.push(`Location, ${createdLocation.name}, created`);
		// console.log(data.kanbanLocations);
	}
}

export async function onLocationDelete(
	removeLocation: LocationType,
	kanbanLocations: LocationType[],
	kanbanWorkorders: WorkOrderDetailType[]
) {
	// console.log('onLocationDelete triggered', removeLocation);
	const response = await fetch(`${PUBLIC_KANBAN_API}/location/${removeLocation.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		// Not sure if this deletion should check with the response data
		// Need to handle cascade delete
		kanbanLocations = kanbanLocations.filter((t) => t.id != removeLocation.id);
		kanbanWorkorders = kanbanWorkorders.filter((t) => t.location.id != removeLocation.id);
		toast.push(`Location, ${removeLocation.name}, deleted`);
		// console.log(data.kanbanLocations);
	}
}

export async function onLocationReorder(
	reorderedLocations: LocationType[],
	kanbanLocations: LocationType[]
) {
	// console.log('onLocationReorder triggered', reorderedLocations);
	const response = await fetch(`${PUBLIC_KANBAN_API}/location/list/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(reorderedLocations)
	});
	if (response.ok) {
		let reorderedLocations: LocationType[] = await response.json();
		kanbanLocations = reorderedLocations;
		toast.push('Locations reordered');
		// console.log(data.kanbanLocations);
	}
}
