<script lang="ts">
	import type { WorkOrderType } from '$lib/types';

	export let WorkOrder: WorkOrderType;
</script>

<div>
	<h1>{WorkOrder.name}</h1>
	<p>{WorkOrder.part.name}</p>
</div>
