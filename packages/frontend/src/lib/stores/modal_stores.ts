import type { Writable } from 'svelte/store';
import type { LocationType, PartType, WorkOrderDetailType, WorkOrderType } from '$lib/types';

import { writable } from 'svelte/store';

export let showCreateCardModal = writable(false);
export let showLocationsModal = writable(false);
export let showPartsModal = writable(false);

export let kanbanLocations: Writable<LocationType[]> = writable([]);
export let kanbanParts: Writable<PartType[]> = writable([]);
export let kanbanWorkorders: Writable<WorkOrderDetailType[]> = writable([]);
