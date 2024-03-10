import type { PartType, WorkOrderDetailType } from '$lib/types';
import type { Writable } from 'svelte/store';
import { PUBLIC_KANBAN_API } from '$env/static/public';

import { toast } from '@zerodevx/svelte-toast';

// TODO
// I think this isn't a good pattern avoid setting stores in utility functions
// Should just return results and set by parent
export async function onPartCreate(
	partialPart: Partial<PartType>,
	kanbanParts: Writable<PartType[]>
) {
	// console.log('onPartCreate triggered', partialPart);
	const response = await fetch(`${PUBLIC_KANBAN_API}/part/create/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(partialPart)
	});
	if (response.ok) {
		let createdPart: PartType = await response.json();
		kanbanParts.update((parts) => [...parts, createdPart]);

		toast.push(`Part, ${createdPart.name}, created`);
		// console.log(data.kanbanParts);
	}
}

export async function onPartDelete(
	removePart: PartType,
	kanbanParts: Writable<PartType[]>,
	kanbanWorkorders: Writable<WorkOrderDetailType[]>
) {
	// console.log('onPartDelete triggered', removePart);
	const response = await fetch(`${PUBLIC_KANBAN_API}/part/${removePart.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		// Need to handle cascade delete
		kanbanParts.update((parts) => parts.filter((t) => t.id != removePart.id));
		kanbanWorkorders.update((workorders) => workorders.filter((t) => t.part.id != removePart.id));
		toast.push(`Part, ${removePart.name}, deleted`);
		// console.log(data.kanbanParts);
	}
}
