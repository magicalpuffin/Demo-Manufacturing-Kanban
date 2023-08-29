import type { PartType, WorkOrderDetailType } from '$lib/types';
import { PUBLIC_KANBAN_API } from '$env/static/public';

import { toast } from '@zerodevx/svelte-toast';

export async function onPartCreate(partialPart: Partial<PartType>, kanbanParts: PartType[]) {
	// console.log('onPartCreate triggered', partialPart);
	const response = await fetch(`${PUBLIC_KANBAN_API}/part/create/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(partialPart)
	});
	if (response.ok) {
		let createdPart: PartType = await response.json();
		kanbanParts = [...kanbanParts, createdPart];

		toast.push(`Part, ${createdPart.name}, created`);
		// console.log(data.kanbanParts);
	}
}

export async function onPartDelete(
	removePart: PartType,
	kanbanParts: PartType[],
	kanbanWorkorders: WorkOrderDetailType[]
) {
	// console.log('onPartDelete triggered', removePart);
	const response = await fetch(`${PUBLIC_KANBAN_API}/part/${removePart.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		// Need to handle cascade delete
		kanbanParts = kanbanParts.filter((t) => t.id != removePart.id);
		kanbanWorkorders = kanbanWorkorders.filter((t) => t.part.id != removePart.id);
		toast.push(`Part, ${removePart.name}, deleted`);
		// console.log(data.kanbanParts);
	}
}
