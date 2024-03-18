import type { LocationSelect } from '$lib/types';
import type {
	locationInsertType,
	locationSelectType
} from '@Demo-Manufacturing-Kanban/core/zodSchema';

import { trpc } from '$lib/client';
import { toast } from '@zerodevx/svelte-toast';

import { writable } from 'svelte/store';

export const locationStore = createLocationStore();

function createLocationStore() {
	const { subscribe, set, update } = writable<LocationSelect[]>([]);

	async function addLocation(newLocation: locationInsertType) {
		try {
			const data = await trpc.createLocation.mutate(newLocation);
			update((n) => [...n, data[0]]);
			toast.push(`Created location ${data[0].name}`);
		} catch {
			toast.push('Failed to create location');
		}
	}
	async function remove(removeLocation: locationSelectType) {
		try {
			const data = await trpc.deleteLocation.mutate(removeLocation);

			update((n) => n.filter((n) => n.id != data[0].id));
			toast.push(`Removed location ${data[0].name}`);
		} catch {
			toast.push('Failed to remove location');
		}
	}

	async function reorder(locationSequence: locationSelectType[]) {
		try {
			const data = await trpc.updateListLocation.mutate(locationSequence);
			update((n) =>
				n.map((n) => {
					const updatedLocation = data.find((updatedLocation) => updatedLocation.id == n.id);
					return { ...n, sequence: updatedLocation ? updatedLocation.sequence : n.sequence };
				})
			);
			toast.push('Updated locations');
		} catch {
			toast.push('Failed to update locations');
		}
	}

	// unused
	function updateLocation(updateLocation: LocationSelect) {
		update((n) => n.map((n) => (n.id == updateLocation.id ? { ...n, ...updateLocation } : n)));
	}

	return {
		subscribe,
		set,
		reset: () => set([]),
		add: addLocation,
		update: updateLocation,
		reorder,
		remove
	};
}
