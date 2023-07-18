<script lang="ts">
	import type { LocationType, WorkOrderType } from '$lib/types';
	import KanbanColumn from './KanbanColumn.svelte';

	export let Locations: LocationType[];
	// temporary setup for dev, should only work orders at location in future
	export let WorkOrders: WorkOrderType[];
</script>

<div class="mx-4">
	<div class="flex flex-row gap-4">
		{#each Locations as Location}
			<KanbanColumn {Location} {WorkOrders} />
		{/each}
	</div>
</div>
