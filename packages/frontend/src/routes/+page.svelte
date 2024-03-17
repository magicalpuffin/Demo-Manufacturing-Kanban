<script lang="ts">
	import type { PageData } from './$types';

	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';

	import { locationStore, partStore, workorderStore } from '$lib/stores/index';

	export let data: PageData;

	locationStore.set(data.locationDetailList);
	partStore.set(data.partList);
	workorderStore.set(data.workOrderDetailList);

	// console.log(data);
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="grow overflow-x-auto">
		<KanbanBoard />
	</div>
</div>
