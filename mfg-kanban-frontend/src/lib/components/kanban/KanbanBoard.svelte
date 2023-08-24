<script lang="ts">
	import type { LocationType, WorkOrderDetailType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import KanbanColumn from './KanbanColumn.svelte';

	export let Locations: LocationType[];
	export let WorkOrders: WorkOrderDetailType[];
	const dispatch = createEventDispatcher();

	let LocationWorkOrders: { Location: LocationType; WorkOrders: WorkOrderDetailType[] }[] = [];

	interface ColumnReorderData {
		location: LocationType;
		workorderIds: string[];
	}

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

	// This might be better in the main page
	function onWorkorderColumnReorder(eventDetail: ColumnReorderData) {
		let { location, workorderIds } = eventDetail;

		let reorderedWorkorders = workorderIds.map((id, index) => {
			let updatingWorkorder = WorkOrders.find((item) => item.id == parseInt(id));
			return { ...updatingWorkorder, priority: index, location: location };
		});
		console.log(location);
		console.log(workorderIds);
		console.log(reorderedWorkorders);

		dispatch('workorderReorder', reorderedWorkorders);
	}

	// $: console.log(LocationWorkOrders);
</script>

<div class="h-full w-full">
	<div class="flex h-full flex-row divide-x-2">
		{#each LocationWorkOrders as LocationWorkOrder}
			<KanbanColumn
				on:workorderDelete
				on:workorderColumnReorder={(e) => onWorkorderColumnReorder(e.detail)}
				Location={LocationWorkOrder.Location}
				WorkOrders={LocationWorkOrder.WorkOrders}
			/>
		{/each}
	</div>
</div>
