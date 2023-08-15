<script lang="ts">
	import type { LocationType, WorkOrderDetailType } from '$lib/types';
	import KanbanColumn from './KanbanColumn.svelte';

	export let Locations: LocationType[];
	export let WorkOrders: WorkOrderDetailType[];

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
		return NewLocationWorkOrders;
	}

	// Reactive to change when Locations and WorkOrders change
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
