import type { LocationSelect, PartSelect, WorkOrderInsert, WorkOrderSelect } from '$lib/types';

import { PUBLIC_API_URL } from '$env/static/public';
import { toast } from '@zerodevx/svelte-toast';

import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

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

	function reorder(locationSequence: LocationSelect['id'][]) {
		update((n) => {
			return n.map((n) => {
				const index = locationSequence.indexOf(n.id);
				return { ...n, sequence: index !== -1 ? index : n.sequence };
			});
		});
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
			const data = await response.json();
			update((n) => [...n, data]);
			toast.push('Created workorder');
		} else {
			toast.push('Failed to create workorder');
		}
	}

	function updateWorkorder(updateWorkorder: WorkOrderSelect) {
		update((n) => n.map((n) => (n.id == updateWorkorder.id ? { ...n, ...updateWorkorder } : n)));
	}

	return {
		subscribe,
		set,
		reset: () => set([]),
		add: addWorkorder,
		update: updateWorkorder
	};
}
