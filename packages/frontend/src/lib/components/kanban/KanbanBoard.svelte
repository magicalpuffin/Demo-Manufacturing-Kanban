<script lang="ts">
	import KanbanColumn from './KanbanColumn.svelte';

	import { kanbanBoardStore } from '$lib/stores';

	// $: console.log($kanbanBoardStore);
</script>

<div class="h-full w-full">
	<div class="flex h-full flex-row divide-x-2">
		<!-- not sure about sorting in each component -->
		{#each $kanbanBoardStore.sort((a, b) => a.sequence - b.sequence) as LocationDetail}
			<KanbanColumn {LocationDetail} />
		{/each}
	</div>
</div>
