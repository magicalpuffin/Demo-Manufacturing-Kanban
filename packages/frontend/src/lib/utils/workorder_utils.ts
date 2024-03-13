import type {
	LocationSelect,
	PartSelect,
	WorkOrderDetailSelect,
	WorkOrderSelect
} from '$lib/types';
import type { Writable } from 'svelte/store';

import { PUBLIC_API_URL } from '$env/static/public';
import { get } from 'svelte/store';

import { toast } from '@zerodevx/svelte-toast';

interface ColumnReorderData {
	location: LocationSelect;
	workorderIds: string[];
}

export async function onWorkorderCreate(
	partialWorkorder: Partial<WorkOrderDetailSelect>,
	kanbanWorkorders: Writable<WorkOrderDetailSelect[]>
) {
	// console.log('onWorkorderCreate triggered', partialWorkorder);
	const response = await fetch(`${PUBLIC_API_URL}/workorder/create/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(partialWorkorder)
	});
	if (response.ok) {
		let createdWorkorder: WorkOrderDetailSelect = await response.json();
		kanbanWorkorders.update((workorders) => [...workorders, createdWorkorder]);

		// console.log(data.kanbanWorkorders);
		// showCreateCardModal = false;
		toast.push(`Workorder, ${createdWorkorder.name}, created`);
	}
}

export async function onWorkorderDelete(
	removeWorkorder: WorkOrderDetailSelect
	// kanbanWorkorders: WorkOrderDetailSelect[]
) {
	// Using workorder detail while API uses workorder without detail
	// console.log('onWorkorderDelete triggered', removeWorkorder);
	const response = await fetch(`${PUBLIC_API_URL}/workorder/${removeWorkorder.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		// Need to handle cascade delete
		// kanbanWorkorders.filter((t) => t.id != removeWorkorder.id);
		toast.push(`Workorder, ${removeWorkorder.name}, deleted`);
		// console.log(data.kanbanWorkorders);
	}
}

export async function onWorkorderColumnReorder(
	eventDetail: ColumnReorderData,
	kanbanWorkorders: Writable<WorkOrderDetailSelect[]>,
	kanbanLocations: LocationSelect[],
	kanbanParts: PartSelect[]
) {
	let { location, workorderIds } = eventDetail;

	let reorderedWorkorders = workorderIds.map((id, index) => {
		let updatingWorkorderDetail = get(kanbanWorkorders).find((item) => item.id == parseInt(id));
		if (updatingWorkorderDetail) {
			let updatingWorkorder: WorkOrderDetailSelect = {
				...updatingWorkorderDetail,
				priority: index,
				location: location.id,
				part: updatingWorkorderDetail?.part.id
			};
			return updatingWorkorder;
		}
	});

	// console.log(location);
	// console.log(workorderIds);
	// console.log(reorderedWorkorders);

	const response = await fetch(`${PUBLIC_KANBAN_API}/workorder/list/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(reorderedWorkorders)
	});
	if (response.ok) {
		let reorderedWorkorders: WorkOrderDetailSelect[] = await response.json();
		kanbanWorkorders.update((workorders) =>
			workorders.map((workorder) => {
				let updatedWorkorder = reorderedWorkorders.find((item) => item.id == workorder.id);
				let location = kanbanLocations.find((item) => item.id == updatedWorkorder?.location);
				let part = kanbanParts.find((item) => item.id == updatedWorkorder?.part);

				if (updatedWorkorder && location && part) {
					return { ...workorder, ...updatedWorkorder, location: location, part: part };
				} else {
					return workorder;
				}
			})
		);

		// console.log(data.kanbanWorkorders);
		toast.push(`Updated ${reorderedWorkorders.length} workorders in ${location.name}`);
	}
	return kanbanWorkorders;
}
