<script lang="ts">
	import type {
		LocationSelect,
		PartSelect,
		WorkOrderDetailSelect,
		LocationDetailSelect
	} from '$lib/types';

	// import { createEventDispatcher } from 'svelte';
	import KanbanColumn from './KanbanColumn.svelte';

	import {
		workorderDetail,
		workorderStore,
		kanbanBoardStore,
		locationStore
	} from '$lib/stores/modal_stores';

	$: console.log($kanbanBoardStore);

	// let LocationWorkOrders: { Location: LocationSelect; WorkOrders: WorkOrderDetailSelect[] }[] = [];

	// function updateLocationWorkOrders(
	// 	Locations: LocationSelect[],
	// 	WorkOrders: WorkOrderDetailSelect[]
	// ) {
	// 	let NewLocationWorkOrders: { Location: LocationSelect; WorkOrders: WorkOrderDetailSelect[] }[] =
	// 		[];

	// 	Locations.forEach((Location) => {
	// 		let WorkOrdersAtLocation = WorkOrders.filter((WorkOrder) => {
	// 			// comparing objects directy doesn't work, need to compare property i guess, could use id
	// 			return WorkOrder.location.name == Location.name;
	// 		});

	// 		NewLocationWorkOrders.push({
	// 			Location: Location,
	// 			WorkOrders: WorkOrdersAtLocation
	// 		});
	// 	});
	// 	// console.log(NewLocationWorkOrders);
	// 	return NewLocationWorkOrders;
	// }

	// Reactive to change when Locations and WorkOrders change
	// $: LocationWorkOrders = updateLocationWorkOrders(Locations, WorkOrders);

	// $: console.log(LocationWorkOrders);
</script>

<div class="h-full w-full">
	<div class="flex h-full flex-row divide-x-2">
		{#each $kanbanBoardStore as LocationDetail}
			<KanbanColumn {LocationDetail} />
		{/each}
	</div>
</div>
