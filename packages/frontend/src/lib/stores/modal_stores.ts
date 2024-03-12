import type { Writable } from 'svelte/store';
import type { LocationSelect, PartSelect, WorkOrderDetailSelect } from '$lib/types';

import { writable } from 'svelte/store';

export let showCreateCardModal = writable(false);
export let showLocationsModal = writable(false);
export let showPartsModal = writable(false);

export let kanbanLocations: Writable<LocationSelect[]> = writable([]);
export let kanbanParts: Writable<PartSelect[]> = writable([]);
export let kanbanWorkorders: Writable<WorkOrderDetailSelect[]> = writable([]);
