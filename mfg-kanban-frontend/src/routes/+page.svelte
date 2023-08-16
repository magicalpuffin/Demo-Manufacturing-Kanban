<script lang="ts">
	import type { LocationType, PartType, WorkOrderDetailType, WorkOrderType } from '$lib/types';
	import type { PageData } from './$types';
	import { PUBLIC_KANBAN_API } from '$env/static/public';

	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/CreateWorkOrder.svelte';
	import ManageLocationModal from '$lib/components/modals/ManageLocationModal.svelte';
	import ManagePartModal from '$lib/components/modals/ManagePartModal.svelte';

	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { onMount } from 'svelte';

	// Consider setting data to variables
	export let data: PageData;

	// console.log(data);

	let showCreateCardModal = false;
	let showLocationsModal = false;
	let showPartsModal = false;

	// TODO: Move separate utils function
	async function onLocationCreate(partialLocation: Partial<LocationType>) {
		console.log('onLocationCreate triggered', partialLocation);

		const response = await fetch(`${PUBLIC_KANBAN_API}/location/create/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(partialLocation)
		});
		if (response.ok) {
			let createdLocation: LocationType = await response.json();
			data.kanbanLocations = [...data.kanbanLocations, createdLocation];

			console.log(data.kanbanLocations);
		}
	}

	async function onPartCreate(partialPart: Partial<PartType>) {
		console.log('onPartCreate triggered', partialPart);
		const response = await fetch(`${PUBLIC_KANBAN_API}/part/create/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(partialPart)
		});
		if (response.ok) {
			let createdPart: PartType = await response.json();
			data.kanbanParts = [...data.kanbanParts, createdPart];

			console.log(data.kanbanParts);
		}
	}

	async function onWorkorderCreate(partialWorkorder: Partial<WorkOrderType>) {
		console.log('onWorkorderCreate triggered', partialWorkorder);
		const response = await fetch(`${PUBLIC_KANBAN_API}/workorder/create/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(partialWorkorder)
		});
		if (response.ok) {
			let createdWorkorder: WorkOrderDetailType = await response.json();
			data.kanbanWorkorders = [...data.kanbanWorkorders, createdWorkorder];

			console.log(data.kanbanWorkorders);
			showCreateCardModal = false;
		}
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
			on:workorderCreate={(e) => onWorkorderCreate(e.detail)}
			bind:showModal={showCreateCardModal}
			Locations={data.kanbanLocations}
			Parts={data.kanbanParts}
		/>
		<ManageLocationModal
			on:locationCreate={(e) => onLocationCreate(e.detail)}
			bind:showModal={showLocationsModal}
			Locations={data.kanbanLocations}
		/>
		<ManagePartModal
			on:partCreate={(e) => onPartCreate(e.detail)}
			bind:showModal={showPartsModal}
			Parts={data.kanbanParts}
		/>
		<div class="flex justify-center">
			<KanbanBoard Locations={data.kanbanLocations} WorkOrders={data.kanbanWorkorders} />
		</div>
	</div>
</div>
