<script lang="ts">
	import type { WorkOrderType } from '$lib/types';

	export let WorkOrder: WorkOrderType;
</script>

<div class="border shadow-md rounded-lg h-48">
	<h1 class="text-lg font-semibold bg-gray-100 px-2 py-2">{WorkOrder.name}</h1>
	<p class="py-2 px-2">{WorkOrder.part.name}</p>
	<p class="py-2 px-2">{WorkOrder.part.description}</p>
</div>
