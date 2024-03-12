<script lang="ts">
	import type { WorkOrderDetailSelect } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let WorkOrder: WorkOrderDetailSelect;
	const dispatch = createEventDispatcher<{ workorderDelete: WorkOrderDetailSelect }>();
</script>

<div class="card h-48 border shadow-md" data-id={WorkOrder.id}>
	<div class="flex flex-row justify-between rounded-t-lg bg-base-200 px-2 py-2 hover:bg-primary">
		<h1 class="text-lg font-semibold">{WorkOrder.name}</h1>
		<button
			class="hover:bg-error)) btn btn-square btn-ghost btn-xs hover:text-error"
			on:click={() => {
				dispatch('workorderDelete', WorkOrder);
			}}><CancelIcon /></button
		>
	</div>
	<p class="px-2 py-2">{WorkOrder.part.name}</p>
	<p class="px-2 py-2">{WorkOrder.part.description}</p>
</div>
