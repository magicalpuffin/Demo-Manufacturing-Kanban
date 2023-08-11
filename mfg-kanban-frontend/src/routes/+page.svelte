<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/CreateWorkOrder.svelte';
	import LocationsModal from '$lib/components/modals/ManageLocationModal.svelte';
	import PartsModal from '$lib/components/modals/ManagePartModal.svelte';

	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { exparts, exlocations, exworkorders } from '$lib/testdata';
	import { onMount } from 'svelte';

	let showCreateCardModal = false;
	let showLocationsModal = false;
	let showPartsModal = false;

	onMount(async () => {
		const response = await fetch('http://localhost:8000/kanban-api/workorder/list/', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		console.log(response);

		if (response.ok) {
			console.log(await response.json());
		}
	});
</script>

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
<CreateCardModal bind:showModal={showCreateCardModal} Locations={exlocations} Parts={exparts} />
<LocationsModal bind:showModal={showLocationsModal} Locations={exlocations} />
<PartsModal bind:showModal={showPartsModal} />
<div class="justify-center flex">
	<KanbanBoard Locations={exlocations} WorkOrders={exworkorders} />
</div>
