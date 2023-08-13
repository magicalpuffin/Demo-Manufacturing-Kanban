<script lang="ts">
	import type { WorkOrderType } from '$lib/types';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let WorkOrder: WorkOrderType;
</script>

<div class="h-48 rounded-lg border shadow-md">
	<div class="flex flex-row justify-between bg-gray-100 px-2 py-2">
		<h1 class="text-lg font-semibold">{WorkOrder.name}</h1>
		<button class="rounded-full hover:bg-gray-300 hover:text-red-600" on:click={() => {}}
			><CancelIcon /></button
		>
	</div>
	<p class="px-2 py-2">{WorkOrder.part.name}</p>
	<p class="px-2 py-2">{WorkOrder.part.description}</p>
</div>
