import type {
	workorderInsertType,
	workorderSelectType
} from '@Demo-Manufacturing-Kanban/core/zodSchema';

import { trpc, isTRPCClientError } from '$lib/client';
import { toast } from '@zerodevx/svelte-toast';

import { writable } from 'svelte/store';

export const workorderStore = createWorkorderStore();

function createWorkorderStore() {
	const { subscribe, set, update } = writable<workorderSelectType[]>([]);

	async function addWorkorder(newWorkorder: workorderInsertType) {
		try {
			const data = await trpc.createWorkorder.mutate(newWorkorder);
			update((n) => [...n, data[0]]);
			toast.push('Created workorder');
		} catch (error) {
			if (isTRPCClientError(error)) {
				toast.push(`${error.message}`);
			} else {
				toast.push('Failed to create workorder');
			}
		}
	}

	async function reorder(workorderSequence: workorderSelectType[]) {
		try {
			const data = await trpc.updateListWorkorder.mutate(workorderSequence);
			update((n) =>
				n.map((n) => {
					const updatedWorkorder = data.find((updatedWorkorder) => updatedWorkorder.id == n.id);
					if (updatedWorkorder) {
						// why not just spread the new obj?
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
		} catch {
			toast.push('Failed to update workorders');
		}
	}

	function updateWorkorder(updateWorkorder: workorderSelectType) {
		update((n) => n.map((n) => (n.id == updateWorkorder.id ? { ...n, ...updateWorkorder } : n)));
	}

	async function remove(removeWorkorder: workorderSelectType) {
		try {
			const data = await trpc.deleteWorkorder.mutate(removeWorkorder);

			update((n) => n.filter((n) => n.id != data[0].id));
			toast.push(`Removed workorder ${data[0].name}`);
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'message' in error) {
				toast.push(`${error.message}`);
			} else {
				toast.push('Failed to remove workorder');
			}
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
