import type {
	LocationSelect,
	PartSelect,
	WorkOrderInsert,
	WorkOrderSelect,
	LocationDetailSelect,
	WorkOrderDetailSelect
} from '$lib/types';

import { PUBLIC_API_URL } from '$env/static/public';
import { toast } from '@zerodevx/svelte-toast';

import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';

// export let kanbanParts: Writable<PartSelect[]> = writable([]);

export const locationStore = createLocationStore();
export const partStore = createPartStore();
export const workorderStore = createWorkorderStore();

function createLocationStore() {
	const { subscribe, set, update } = writable<LocationSelect[]>([]);

	async function addLocation(newLocation: Partial<LocationSelect>) {
		const response = await fetch(`${PUBLIC_API_URL}/location`, {
			method: 'POST',
			body: JSON.stringify(newLocation)
		});

		if (response.ok) {
			const data: LocationSelect[] = await response.json();
			update((n) => [...n, data[0]]);
			toast.push('Created location');
		} else {
			toast.push('Failed to create location');
		}
	}
	async function remove(removeLocation: LocationSelect) {
		const response = await fetch(`${PUBLIC_API_URL}/location/${removeLocation.id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			const data: LocationSelect[] = await response.json();

			update((n) => n.filter((n) => n.id != data[0].id));
			toast.push(`Removed location ${data[0].name}`);
		} else {
			toast.push('Failed to remove location');
		}
	}

	async function reorder(locationSequence: LocationSelect[]) {
		const response = await fetch(`${PUBLIC_API_URL}/location`, {
			method: 'PUT',
			body: JSON.stringify(locationSequence)
		});
		if (response.ok) {
			const data: LocationSelect[] = await response.json();
			update((n) =>
				n.map((n) => {
					const updatedLocation = data.find((updatedLocation) => updatedLocation.id == n.id);
					return { ...n, sequence: updatedLocation ? updatedLocation.sequence : n.sequence };
				})
			);
			toast.push('Updated locations');
		} else {
			toast.push('Failed to update locations');
		}
	}

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

function createPartStore() {
	const { subscribe, set, update } = writable<PartSelect[]>([]);

	async function addPart(newPart: Partial<PartSelect>) {
		const response = await fetch(`${PUBLIC_API_URL}/part`, {
			method: 'POST',
			body: JSON.stringify(newPart)
		});

		if (response.ok) {
			const data: PartSelect[] = await response.json();
			update((n) => [...n, data[0]]);
			toast.push('Created part');
		} else {
			toast.push('Failed to create part');
		}
	}

	async function remove(removePart: PartSelect) {
		const response = await fetch(`${PUBLIC_API_URL}/part/${removePart.id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			const data: PartSelect[] = await response.json();

			update((n) => n.filter((n) => n.id != data[0].id));
			toast.push(`Removed part ${data[0].name}`);
		} else {
			toast.push('Failed to remove part');
		}
	}

	function updatePart(updatePart: PartSelect) {
		update((n) => n.map((n) => (n.id == updatePart.id ? { ...n, ...updatePart } : n)));
	}

	return {
		subscribe,
		set,
		reset: () => set([]),
		add: addPart,
		update: updatePart,
		remove
	};
}

function createWorkorderStore() {
	const { subscribe, set, update } = writable<WorkOrderSelect[]>([]);

	async function addWorkorder(newWorkorder: Partial<WorkOrderInsert>) {
		const response = await fetch(`${PUBLIC_API_URL}/workorder`, {
			method: 'POST',
			body: JSON.stringify(newWorkorder)
		});

		if (response.ok) {
			const data: WorkOrderSelect[] = await response.json();
			update((n) => [...n, data[0]]);
			toast.push('Created workorder');
		} else {
			toast.push('Failed to create workorder');
		}
	}

	async function reorder(workorderSequence: WorkOrderSelect[]) {
		const response = await fetch(`${PUBLIC_API_URL}/workorder`, {
			method: 'PUT',
			body: JSON.stringify(workorderSequence)
		});
		if (response.ok) {
			const data: WorkOrderSelect[] = await response.json();
			update((n) =>
				n.map((n) => {
					const updatedWorkorder = data.find((updatedWorkorder) => updatedWorkorder.id == n.id);
					if (updatedWorkorder) {
						return {
							...n,
							priority: updatedWorkorder.priority,
							locationId: updatedWorkorder.locationId,
							partId: updatedWorkorder.partId
						};
					}
					return n;
				})
			);
			toast.push('Updated workorders');
		} else {
			toast.push('Failed to update workorders');
		}
	}

	function updateWorkorder(updateWorkorder: WorkOrderSelect) {
		update((n) => n.map((n) => (n.id == updateWorkorder.id ? { ...n, ...updateWorkorder } : n)));
	}

	async function remove(removeWorkorder: WorkOrderSelect) {
		const response = await fetch(`${PUBLIC_API_URL}/workorder/${removeWorkorder.id}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			const data: WorkOrderSelect[] = await response.json();

			update((n) => n.filter((n) => n.id != data[0].id));
			toast.push(`Removed workorder ${data[0].name}`);
		} else {
			toast.push('Failed to remove workorder');
		}
	}

	return {
		subscribe,
		set,
		reset: () => set([]),
		add: addWorkorder,
		update: updateWorkorder,
		reorder,
		remove
	};
}

export const workorderDetail: Readable<WorkOrderDetailSelect[]> = derived(
	[workorderStore, partStore, locationStore],
	([$workorderStore, $partStore, $locationStore]) => {
		return $workorderStore.map((workorder) => {
			return {
				...workorder,
				part: $partStore.find((part) => part.id == workorder.partId),
				location: $locationStore.find((location) => location.id == workorder.locationId)
			} as WorkOrderDetailSelect;
		});
	}
);

export const kanbanBoardStore: Readable<LocationDetailSelect[]> = derived(
	[workorderDetail, locationStore],
	([$workorderDetail, $locationStore]) => {
		return $locationStore.map((location) => {
			return {
				...location,
				workorders: $workorderDetail.filter((workorder) => location.id == workorder.locationId)
			} as LocationDetailSelect;
		});
	}
);
