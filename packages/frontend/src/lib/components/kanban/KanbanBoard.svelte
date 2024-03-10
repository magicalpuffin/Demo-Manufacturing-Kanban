<script lang="ts">
	import type { LocationType, PartType, WorkOrderDetailType } from '$lib/types';
	import type { Writable } from 'svelte/store';

	import { createEventDispatcher } from 'svelte';
	import KanbanColumn from './KanbanColumn.svelte';

	import { onWorkorderDelete, onWorkorderColumnReorder } from '$lib/utils/workorder_utils';

	export let Locations: Writable<LocationType[]>;
	export let Parts: Writable<PartType[]>;
	export let WorkOrders: Writable<WorkOrderDetailType[]>;

	let LocationWorkOrders: { Location: LocationType; WorkOrders: WorkOrderDetailType[] }[] = [];

	function updateLocationWorkOrders(Locations: LocationType[], WorkOrders: WorkOrderDetailType[]) {
		let NewLocationWorkOrders: { Location: LocationType; WorkOrders: WorkOrderDetailType[] }[] = [];

		Locations.forEach((Location) => {
			let WorkOrdersAtLocation = WorkOrders.filter((WorkOrder) => {
				// comparing objects directy doesn't work, need to compare property i guess, could use id
				return WorkOrder.location.name == Location.name;
			});

			NewLocationWorkOrders.push({
				Location: Location,
				WorkOrders: WorkOrdersAtLocation
			});
		});
		// console.log(NewLocationWorkOrders);
		return NewLocationWorkOrders;
	}

	// Reactive to change when Locations and WorkOrders change
	$: LocationWorkOrders = updateLocationWorkOrders($Locations, $WorkOrders);

	// $: console.log(LocationWorkOrders);
</script>

<div class="h-full w-full">
	<div class="flex h-full flex-row divide-x-2">
		{#each LocationWorkOrders as LocationWorkOrder}
			<KanbanColumn
				on:workorderDelete={(e) => onWorkorderDelete(e.detail, WorkOrders)}
				on:workorderColumnReorder={(e) =>
					onWorkorderColumnReorder(e.detail, WorkOrders, $Locations, $Parts)}
				Location={LocationWorkOrder.Location}
				WorkOrders={LocationWorkOrder.WorkOrders}
			/>
		{/each}
	</div>
</div>
