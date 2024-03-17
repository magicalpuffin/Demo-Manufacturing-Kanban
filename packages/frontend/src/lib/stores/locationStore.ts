import type { LocationSelect } from '$lib/types';

import { PUBLIC_API_URL } from '$env/static/public';
import { toast } from '@zerodevx/svelte-toast';

import { writable } from 'svelte/store';

export const locationStore = createLocationStore();

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
