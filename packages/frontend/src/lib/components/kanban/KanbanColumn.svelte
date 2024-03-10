<script lang="ts">
	import type { LocationType, WorkOrderDetailType } from '$lib/types';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	import KanbanCard from './KanbanCard.svelte';
	import Sortable from 'sortablejs';

	export let Location: LocationType;
	export let WorkOrders: WorkOrderDetailType[];

	$: sortedWorkOrders = WorkOrders.sort((a, b) => a.priority - b.priority);

	interface ColumnReorderData {
		location: LocationType;
		workorderIds: string[];
	}

	const dispatch = createEventDispatcher<{ workorderColumnReorder: ColumnReorderData }>();
	let sortableEle: HTMLElement;
	let sortableObj: Sortable;

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			onSort: function (evt) {
				// Need to figure out how update database
				// console.log('sort ended');
				// console.log(evt.from);
				// console.log(evt.to);
				// let reorderedWorkorders = sortableObj.toArray().map((id, index) => {
				// 	let updatingWorkorder = WorkOrders.find((item) => item.id == parseInt(id));
				// 	return { ...updatingWorkorder, priority: index, location: Location };
				// });
				// console.log(Location.name);
				// console.log(sortableObj.toArray());
				// console.log(reorderedWorkorders);

				const eventData: ColumnReorderData = {
					location: Location,
					workorderIds: sortableObj.toArray()
				};

				dispatch('workorderColumnReorder', eventData);
			}
		});
	});
</script>

<div class="h-full w-64 flex-none overflow-y-auto overflow-x-hidden px-4">
	<h1 class="px-2 pb-4 pt-2 text-2xl font-bold">{Location.name}</h1>
	<div bind:this={sortableEle} class="flex min-h-[100px] flex-col gap-2 py-2">
		{#each sortedWorkOrders as WorkOrder (WorkOrder.id)}
			<KanbanCard on:workorderDelete {WorkOrder} />
		{/each}
	</div>
</div>
