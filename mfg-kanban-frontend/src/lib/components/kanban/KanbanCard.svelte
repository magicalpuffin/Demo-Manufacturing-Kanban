<script lang="ts">
	import type { WorkOrderType } from '$lib/types';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let WorkOrder: WorkOrderType;
</script>

<div class="border shadow-md rounded-lg h-48">
	<div class="px-2 py-2 flex flex-row justify-between bg-gray-100">
		<h1 class="text-lg font-semibold">{WorkOrder.name}</h1>
		<button class="hover:bg-gray-300 rounded-full hover:text-red-600" on:click={() => {}}
			><CancelIcon /></button
		>
	</div>
	<p class="py-2 px-2">{WorkOrder.part.name}</p>
	<p class="py-2 px-2">{WorkOrder.part.description}</p>
</div>
