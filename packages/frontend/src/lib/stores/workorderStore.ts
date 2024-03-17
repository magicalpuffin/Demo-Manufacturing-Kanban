import type { WorkOrderInsert, WorkOrderSelect } from '$lib/types';

import { PUBLIC_API_URL } from '$env/static/public';
import { toast } from '@zerodevx/svelte-toast';

import { writable } from 'svelte/store';

export const workorderStore = createWorkorderStore();

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
