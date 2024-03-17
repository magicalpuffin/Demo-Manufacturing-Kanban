import type { PartSelect } from '$lib/types';

import { PUBLIC_API_URL } from '$env/static/public';
import { toast } from '@zerodevx/svelte-toast';

import { writable } from 'svelte/store';

export const partStore = createPartStore();

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
