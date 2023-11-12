<script lang="ts">
	import type { PageData } from './$types';

	import { kanbanLocations, kanbanParts, kanbanWorkorders } from '$lib/stores/modal_stores';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';

	export let data: PageData;

	kanbanLocations.set(data.kanbanLocations);
	kanbanParts.set(data.kanbanParts);
	kanbanWorkorders.set(data.kanbanWorkorders);

	// console.log(data);
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="flex flex-1 overflow-x-auto">
		<div class="flex justify-center">
			<KanbanBoard Locations={kanbanLocations} Parts={kanbanParts} WorkOrders={kanbanWorkorders} />
		</div>
	</div>
</div>
