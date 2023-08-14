<script lang="ts">
	import type { LocationType, PartType, WorkOrderType } from '$lib/types';
	import type { PageData } from './$types';

	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/CreateWorkOrder.svelte';
	import ManageLocationModal from '$lib/components/modals/ManageLocationModal.svelte';
	import ManagePartModal from '$lib/components/modals/ManagePartModal.svelte';

	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	// console.log(data);

	let showCreateCardModal = false;
	let showLocationsModal = false;
	let showPartsModal = false;

	function onLocationCreate(partialLocation: Partial<LocationType>) {
		console.log('onLocationCreate triggered', partialLocation);
	}
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
		<ManageLocationModal
			on:locationCreate={(e) => onLocationCreate(e.detail)}
			bind:showModal={showLocationsModal}
			Locations={data.kanbanLocations}
		/>
		<ManagePartModal bind:showModal={showPartsModal} Parts={data.kanbanParts} />
		<div class="flex justify-center">
			<KanbanBoard Locations={data.kanbanLocations} WorkOrders={data.kanbanWorkorders} />
		</div>
	</div>
</div>
