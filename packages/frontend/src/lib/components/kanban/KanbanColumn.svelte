<script lang="ts">
	import type {
		LocationSelect,
		WorkOrderDetailSelect,
		LocationDetailSelect,
		WorkOrderSelect
	} from '$lib/types';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	import KanbanCard from './KanbanCard.svelte';
	import Sortable from 'sortablejs';
	import { workorderStore } from '$lib/stores/modal_stores';

	export let LocationDetail: LocationDetailSelect;

	// $: sortedWorkOrders = WorkOrders.sort((a, b) => a.priority - b.priority);

	interface ColumnReorderData {
		location: LocationSelect;
		workorderIds: string[];
	}

	const dispatch = createEventDispatcher();
	let sortableEle: HTMLElement;
	let sortableObj: Sortable;

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			// onSort: function (evt) {
			// 	// Need to figure out how update database
			// 	// console.log('sort ended');
			// 	// console.log(evt.from);
			// 	// console.log(evt.to);
			// 	// let reorderedWorkorders = sortableObj.toArray().map((id, index) => {
			// 	// 	let updatingWorkorder = WorkOrders.find((item) => item.id == parseInt(id));
			// 	// 	return { ...updatingWorkorder, priority: index, location: Location };
			// 	// });
			// 	// console.log(Location.name);
			// 	// console.log(sortableObj.toArray());
			// 	// console.log(reorderedWorkorders);

			// 	const eventData: ColumnReorderData = {
			// 		location: LocationDetail,
			// 		workorderIds: sortableObj.toArray()
			// 	};
			// 	console.log(eventData);
			// }
			// Event when reording within a columnt
			onUpdate: (evt) => {
				let reorderedWorkorders = sortableObj.toArray().map((id, index) => {
					let updatingWorkorder = $workorderStore.find(
						(item) => item.id == parseInt(id)
					) as WorkOrderSelect;
					return { ...updatingWorkorder, priority: index, locationId: LocationDetail.id };
				});
				console.log(reorderedWorkorders);
				workorderStore.reorder(reorderedWorkorders);
			},
			// Event when adding to new column
			// Technically old column isn't updated but priorities should remain sorted
			onAdd: (evt) => {
				let reorderedWorkorders = sortableObj.toArray().map((id, index) => {
					let updatingWorkorder = $workorderStore.find(
						(item) => item.id == parseInt(id)
					) as WorkOrderSelect;
					return { ...updatingWorkorder, priority: index, locationId: LocationDetail.id };
				});
				console.log(reorderedWorkorders);
				workorderStore.reorder(reorderedWorkorders);
			}
		});
	});
</script>

<div class="h-full w-64 flex-none overflow-y-auto overflow-x-hidden px-4">
	<h1 class="px-2 pb-4 pt-2 text-2xl font-bold">{LocationDetail.name}</h1>
	<div
		bind:this={sortableEle}
		class="flex min-h-[100px] flex-col gap-2 py-2"
		data-id={LocationDetail.id}
	>
		{#each LocationDetail.workorders.sort((a, b) => a.priority - b.priority) as WorkOrder (WorkOrder.id)}
			<KanbanCard {WorkOrder} />
		{/each}
	</div>
</div>
