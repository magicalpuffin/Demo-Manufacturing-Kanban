import type { partInsertType, partSelectType } from '@Demo-Manufacturing-Kanban/core/zodSchema';

import { trpc } from '$lib/client';
import { toast } from '@zerodevx/svelte-toast';

import { writable } from 'svelte/store';

export const partStore = createPartStore();

function createPartStore() {
	const { subscribe, set, update } = writable<partSelectType[]>([]);

	async function addPart(newPart: partInsertType) {
		try {
			const data = await trpc.createPart.mutate(newPart);
			update((n) => [...n, data[0]]);
			toast.push(`Created part ${data[0].name}`);
		} catch {
			toast.push('Failed to create part');
		}
	}

	async function remove(removePart: partSelectType) {
		try {
			const data = await trpc.deletePart.mutate(removePart);

			update((n) => n.filter((n) => n.id != data[0].id));
			toast.push(`Removed part ${data[0].name}`);
		} catch {
			toast.push('Failed to remove part');
		}
	}

	function updatePart(updatePart: partSelectType) {
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
