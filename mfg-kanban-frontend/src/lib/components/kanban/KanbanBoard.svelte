<script lang="ts">
	import type { LocationType, WorkOrderType } from '$lib/types';
	import KanbanColumn from './KanbanColumn.svelte';

	export let Locations: LocationType[];
	export let WorkOrders: WorkOrderType[];

	// temporary setup for development, there may be a better method
	let LocationWorkOrders: { Location: LocationType; WorkOrders: WorkOrderType[] }[] = [];

	Locations.forEach((Location) => {
		let WorkOrdersAtLocation = WorkOrders.filter((WorkOrder) => {
			return WorkOrder.location == Location;
		});

		LocationWorkOrders.push({
			Location: Location,
			WorkOrders: WorkOrdersAtLocation
		});
	});
</script>

<div class="mx-4">
	<div class="flex flex-row divide-x-2">
		{#each LocationWorkOrders as LocationWorkOrder}
			<KanbanColumn
				Location={LocationWorkOrder.Location}
				WorkOrders={LocationWorkOrder.WorkOrders}
			/>
		{/each}
	</div>
</div>
