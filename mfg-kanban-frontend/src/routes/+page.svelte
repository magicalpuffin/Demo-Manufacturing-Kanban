<script lang="ts">
	import type { LocationType, PartType, WorkOrderType } from '$lib/types';
	import type { PageData } from './$types';

	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/CreateWorkOrder.svelte';
	import ManageLocationModal from '$lib/components/modals/ManageLocationModal.svelte';
	import ManagePartModal from '$lib/components/modals/ManagePartModal.svelte';

	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { exparts, exlocations, exworkorders } from '$lib/testdata';
	import { onMount } from 'svelte';

	export let data: PageData;

	// console.log(data);

	let showCreateCardModal = false;
	let showLocationsModal = false;
	let showPartsModal = false;

	// let kanbanLocations: LocationType[];
	// let kanbanWorkorders: WorkOrderType[];

	// onMount(async () => {
	// 	// horrible setup, should use promies and waits properly
	// 	const location_response = await fetch('http://localhost:8000/kanban-api/location/list/', {
	// 		method: 'GET',
	// 		headers: { 'Content-Type': 'application/json' }
	// 	});

	// 	if (location_response.ok) {
	// 		kanbanLocations = await location_response.json();
	// 		// console.log(kanbanLocations);
	// 	}

	// 	const workorder_response = await fetch('http://localhost:8000/kanban-api/workorder/list/', {
	// 		method: 'GET',
	// 		headers: { 'Content-Type': 'application/json' }
	// 	});

	// 	if (workorder_response.ok) {
	// 		kanbanWorkorders = await workorder_response.json();
	// 	}
	// });
</script>

<div class="flex h-screen flex-col">
	<Navbar
		on:clickCreateCard={() => {
			showCreateCardModal = true;
		}}
		on:clickLocations={() => {
			showLocationsModal = true;
		}}
		on:clickParts={() => {
			showPartsModal = true;
		}}
	/>
	<div class="flex flex-1 overflow-x-auto">
		<CreateCardModal
			bind:showModal={showCreateCardModal}
			Locations={data.kanbanLocations}
			Parts={data.kanbanParts}
		/>
		<ManageLocationModal bind:showModal={showLocationsModal} Locations={data.kanbanLocations} />
		<ManagePartModal bind:showModal={showPartsModal} />
		<div class="justify-center flex">
			<KanbanBoard Locations={data.kanbanLocations} WorkOrders={data.kanbanWorkorders} />
		</div>
	</div>
</div>
