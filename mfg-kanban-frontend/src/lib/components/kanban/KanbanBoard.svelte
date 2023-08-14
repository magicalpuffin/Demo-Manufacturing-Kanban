<script lang="ts">
	import type { LocationType, WorkOrderType } from '$lib/types';
	import KanbanColumn from './KanbanColumn.svelte';

	export let Locations: LocationType[];
	export let WorkOrders: WorkOrderType[];

	// temporary setup for development, there may be a better method
	let LocationWorkOrders: { Location: LocationType; WorkOrders: WorkOrderType[] }[] = [];

	// Locations.forEach((Location) => {
	// 	let WorkOrdersAtLocation = WorkOrders.filter((WorkOrder) => {
	// 		// comparing objects directy doesn't work, need to compare property i guess
	// 		return WorkOrder.location.name == Location.name;
	// 	});

	// 	LocationWorkOrders.push({
	// 		Location: Location,
	// 		WorkOrders: WorkOrdersAtLocation
	// 	});
	// });

	// work around due to reactivity issues, start off as undefined
	// $: console.log(Locations);
	// $: console.log(WorkOrders);

	function updateLocationWorkOrders(Locations: LocationType[], WorkOrders: WorkOrderType[]) {
		let NewLocationWorkOrders: { Location: LocationType; WorkOrders: WorkOrderType[] }[] = [];
		// checking if undefined, work around to update after fetch completes
		if (Locations && WorkOrders) {
			Locations.forEach((Location) => {
				let WorkOrdersAtLocation = WorkOrders.filter((WorkOrder) => {
					// comparing objects directy doesn't work, need to compare property i guess
					return WorkOrder.location.name == Location.name;
				});

				NewLocationWorkOrders.push({
					Location: Location,
					WorkOrders: WorkOrdersAtLocation
				});
			});
		}
		return NewLocationWorkOrders;
	}

	// work around, updating because values change after fetch completes
	$: LocationWorkOrders = updateLocationWorkOrders(Locations, WorkOrders);

	// $: console.log(LocationWorkOrders);
</script>

<div class="h-full w-full">
	<div class="flex h-full flex-row divide-x-2">
		{#each LocationWorkOrders as LocationWorkOrder}
			<KanbanColumn
				Location={LocationWorkOrder.Location}
				WorkOrders={LocationWorkOrder.WorkOrders}
			/>
		{/each}
	</div>
</div>
