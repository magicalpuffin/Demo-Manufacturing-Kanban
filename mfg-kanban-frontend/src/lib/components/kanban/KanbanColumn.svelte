<script lang="ts">
	import type { LocationType, WorkOrderType } from '$lib/types';
	import KanbanCard from './KanbanCard.svelte';

	export let Location: LocationType;
	export let WorkOrders: WorkOrderType[];
</script>

<div class="border rounded-lg">
	<h1 class="font-bold text-2xl py-2 px-2">{Location.name}</h1>
	<div class="flex flex-col gap-2 px-2 py-2">
		{#each WorkOrders as WorkOrder}
			<KanbanCard {WorkOrder} />
		{/each}
	</div>
</div>
