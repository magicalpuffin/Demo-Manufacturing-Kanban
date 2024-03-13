import type { Writable } from 'svelte/store';
import type { LocationSelect, PartSelect, WorkOrderDetailSelect } from '$lib/types';

import { writable } from 'svelte/store';

export let showCreateCardModal = writable(false);
export let showLocationsModal = writable(false);
export let showPartsModal = writable(false);

export let kanbanLocations: Writable<LocationSelect[]> = writable([]);
export let kanbanParts: Writable<PartSelect[]> = writable([]);
export let kanbanWorkorders: Writable<WorkOrderDetailSelect[]> = writable([]);

export function LocationStore() {
	const { subscribe, set, update } = writable<LocationSelect[]>([]);

	return {
		subscribe,
		set,
		reset: () => set([]),
		add: (newLocation: LocationSelect) => update((locationList) => [...locationList, newLocation]),
		update: (updateLocation: LocationSelect) =>
			update((locationList) =>
				locationList.map((locationList) =>
					locationList.id == updateLocation.id
						? { ...locationList, ...updateLocation }
						: locationList
				)
			)
	};
}
