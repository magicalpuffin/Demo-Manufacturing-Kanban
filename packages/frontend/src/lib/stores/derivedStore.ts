import type { LocationDetailSelect, WorkOrderDetailSelect } from '$lib/types';

import { locationStore } from './locationStore';
import { partStore } from './partStore';
import { workorderStore } from './workorderStore';

import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';

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
