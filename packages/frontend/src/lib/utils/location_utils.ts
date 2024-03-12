import type { LocationSelect, WorkOrderDetailSelect } from '$lib/types';
import type { Writable } from 'svelte/store';
import { PUBLIC_API_URL } from '$env/static/public';

import { toast } from '@zerodevx/svelte-toast';

export async function onLocationCreate(
	partialLocation: Partial<LocationSelect>,
	kanbanLocations: Writable<LocationSelect[]>
) {
	// console.log('onLocationCreate triggered', partialLocation);

	const response = await fetch(`${PUBLIC_API_URL}/location`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(partialLocation)
	});
	if (response.ok) {
		let createdLocation: LocationSelect = await response.json();
		kanbanLocations.update((locations) =>
			[...locations, createdLocation].sort((a, b) => a.sequence - b.sequence)
		);

		toast.push(`Location, ${createdLocation.name}, created`);
		// console.log(data.kanbanLocations);
	}
}

export async function onLocationDelete(
	removeLocation: LocationSelect,
	kanbanLocations: Writable<LocationSelect[]>,
	kanbanWorkorders: Writable<WorkOrderDetailSelect[]>
) {
	// console.log('onLocationDelete triggered', removeLocation);
	const response = await fetch(`${PUBLIC_API_URL}/location/${removeLocation.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		// Not sure if this deletion should check with the response data
		// Need to handle cascade delete
		kanbanLocations.update((locations) => locations.filter((t) => t.id != removeLocation.id));
		kanbanWorkorders.update((workorders) =>
			workorders.filter((t) => t.location.id != removeLocation.id)
		);
		toast.push(`Location, ${removeLocation.name}, deleted`);
		// console.log(data.kanbanLocations);
	}
}

export async function onLocationReorder(
	reorderedLocations: LocationSelect[],
	kanbanLocations: Writable<LocationSelect[]>
) {
	// console.log('onLocationReorder triggered', reorderedLocations);
	const response = await fetch(`${PUBLIC_API_URL}/location/list/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(reorderedLocations)
	});
	if (response.ok) {
		// let reorderedLocations: LocationType[] = await response.json();
		kanbanLocations.set(reorderedLocations);
		toast.push('Locations reordered');
		// console.log(data.kanbanLocations);
	}
}
