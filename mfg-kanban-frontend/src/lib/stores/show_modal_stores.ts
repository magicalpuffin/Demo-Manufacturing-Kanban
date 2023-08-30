import { writable } from 'svelte/store';

export let showCreateCardModal = writable(false);
export let showLocationsModal = writable(false);
export let showPartsModal = writable(false);
