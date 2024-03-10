<script lang="ts">
	import type { PageData } from './$types';

	import { kanbanLocations, kanbanParts, kanbanWorkorders } from '$lib/stores/modal_stores';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';

	export let data: PageData;

	console.log(data);
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="grow overflow-x-auto">
		<KanbanBoard Locations={kanbanLocations} Parts={kanbanParts} WorkOrders={kanbanWorkorders} />
	</div>
</div>
