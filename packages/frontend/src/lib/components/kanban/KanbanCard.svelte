<script lang="ts">
	import type { WorkOrderDetailType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let WorkOrder: WorkOrderDetailType;
	const dispatch = createEventDispatcher<{ workorderDelete: WorkOrderDetailType }>();
</script>

<div class="card h-48 border shadow-md" data-id={WorkOrder.id}>
	<div class="bg-base-200 hover:bg-primary flex flex-row justify-between rounded-t-lg px-2 py-2">
		<h1 class="text-lg font-semibold">{WorkOrder.name}</h1>
		<button
			class="btn btn-xs btn-square btn-ghost hover:text-error hover:bg-error))"
			on:click={() => {
				dispatch('workorderDelete', WorkOrder);
			}}><CancelIcon /></button
		>
	</div>
	<p class="px-2 py-2">{WorkOrder.part.name}</p>
	<p class="px-2 py-2">{WorkOrder.part.description}</p>
</div>
