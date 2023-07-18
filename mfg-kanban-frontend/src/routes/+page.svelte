<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/CreateWorkOrder.svelte';
	import LocationsModal from '$lib/components/modals/ManageLocationModal.svelte';
	import PartsModal from '$lib/components/modals/ManagePartModal.svelte';

	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { exparts, exlocations, exworkorders } from '$lib/testdata';

	let showCreateCardModal = false;
	let showLocationsModal = false;
	let showPartsModal = false;
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
<CreateCardModal bind:showModal={showCreateCardModal} />
<LocationsModal bind:showModal={showLocationsModal} />
<PartsModal bind:showModal={showPartsModal} />

<KanbanBoard Locations={exlocations} WorkOrders={exworkorders} />
