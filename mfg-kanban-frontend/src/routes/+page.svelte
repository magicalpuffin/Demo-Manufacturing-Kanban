<script lang="ts">
	import type { LocationType, PartType, WorkOrderDetailType, WorkOrderType } from '$lib/types';
	import type { PageData } from './$types';
	import { PUBLIC_KANBAN_API } from '$env/static/public';

	import { toast } from '@zerodevx/svelte-toast';

	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/workorder_modal/CreateWorkOrder.svelte';
	import ManageLocationModal from '$lib/components/modals/location_modal/ManageLocationModal.svelte';
	import ManagePartModal from '$lib/components/modals/part_modal/ManagePartModal.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';

	// Consider setting data to variables
	export let data: PageData;

	// console.log(data);

	interface ColumnReorderData {
		location: LocationType;
		workorderIds: string[];
	}

	let showCreateCardModal = false;
	let showLocationsModal = false;
	let showPartsModal = false;

	// TODO: Move separate utils function
	async function onLocationCreate(partialLocation: Partial<LocationType>) {
		// console.log('onLocationCreate triggered', partialLocation);

		const response = await fetch(`${PUBLIC_KANBAN_API}/location/create/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(partialLocation)
		});
		if (response.ok) {
			let createdLocation: LocationType = await response.json();
			data.kanbanLocations = [...data.kanbanLocations, createdLocation];
			data.kanbanLocations = data.kanbanLocations.slice().sort((a, b) => a.sequence - b.sequence);

			toast.push(`Location, ${createdLocation.name}, created`);
			// console.log(data.kanbanLocations);
		}
	}

	async function onLocationDelete(removeLocation: LocationType) {
		// console.log('onLocationDelete triggered', removeLocation);
		const response = await fetch(`${PUBLIC_KANBAN_API}/location/${removeLocation.id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			// Not sure if this deletion should check with the response data
			// Need to handle cascade delete
			data.kanbanLocations = data.kanbanLocations.filter((t) => t.id != removeLocation.id);
			data.kanbanWorkorders = data.kanbanWorkorders.filter(
				(t) => t.location.id != removeLocation.id
			);
			toast.push(`Location, ${removeLocation.name}, deleted`);
			// console.log(data.kanbanLocations);
		}
	}

	async function onLocationReorder(reorderedLocations: LocationType[]) {
		// console.log('onLocationReorder triggered', reorderedLocations);
		const response = await fetch(`${PUBLIC_KANBAN_API}/location/list/`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(reorderedLocations)
		});
		if (response.ok) {
			let reorderedLocations: LocationType[] = await response.json();
			data.kanbanLocations = reorderedLocations;
			toast.push('Locations reordered');
			// console.log(data.kanbanLocations);
		}
	}

	async function onPartCreate(partialPart: Partial<PartType>) {
		// console.log('onPartCreate triggered', partialPart);
		const response = await fetch(`${PUBLIC_KANBAN_API}/part/create/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(partialPart)
		});
		if (response.ok) {
			let createdPart: PartType = await response.json();
			data.kanbanParts = [...data.kanbanParts, createdPart];

			toast.push(`Part, ${createdPart.name}, created`);
			// console.log(data.kanbanParts);
		}
	}

	async function onPartDelete(removePart: PartType) {
		// console.log('onPartDelete triggered', removePart);
		const response = await fetch(`${PUBLIC_KANBAN_API}/part/${removePart.id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			// Need to handle cascade delete
			data.kanbanParts = data.kanbanParts.filter((t) => t.id != removePart.id);
			data.kanbanWorkorders = data.kanbanWorkorders.filter((t) => t.part.id != removePart.id);
			toast.push(`Part, ${removePart.name}, deleted`);
			// console.log(data.kanbanParts);
		}
	}

	async function onWorkorderCreate(partialWorkorder: Partial<WorkOrderType>) {
		// console.log('onWorkorderCreate triggered', partialWorkorder);
		const response = await fetch(`${PUBLIC_KANBAN_API}/workorder/create/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(partialWorkorder)
		});
		if (response.ok) {
			let createdWorkorder: WorkOrderDetailType = await response.json();
			data.kanbanWorkorders = [...data.kanbanWorkorders, createdWorkorder];

			// console.log(data.kanbanWorkorders);
			showCreateCardModal = false;
			toast.push(`Workorder, ${createdWorkorder.name}, created`);
		}
	}

	async function onWorkorderDelete(removeWorkorder: WorkOrderDetailType) {
		// Using workorder detail while API uses workorder without detail
		// console.log('onWorkorderDelete triggered', removeWorkorder);
		const response = await fetch(`${PUBLIC_KANBAN_API}/workorder/${removeWorkorder.id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			// Need to handle cascade delete
			data.kanbanWorkorders = data.kanbanWorkorders.filter((t) => t.id != removeWorkorder.id);
			toast.push(`Workorder, ${removeWorkorder.name}, deleted`);
			// console.log(data.kanbanWorkorders);
		}
	}

	// This might be better in the main page
	async function onWorkorderColumnReorder(eventDetail: ColumnReorderData) {
		let { location, workorderIds } = eventDetail;

		let reorderedWorkorders = workorderIds.map((id, index) => {
			let updatingWorkorderDetail = data.kanbanWorkorders.find((item) => item.id == parseInt(id));
			if (updatingWorkorderDetail) {
				let updatingWorkorder: WorkOrderType = {
					...updatingWorkorderDetail,
					priority: index,
					location: location.id,
					part: updatingWorkorderDetail?.part.id
				};
				return updatingWorkorder;
			}
		});

		console.log(location);
		console.log(workorderIds);
		console.log(reorderedWorkorders);

		const response = await fetch(`${PUBLIC_KANBAN_API}/workorder/list/`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(reorderedWorkorders)
		});
		if (response.ok) {
			let reorderedWorkorders: WorkOrderType[] = await response.json();
			data.kanbanWorkorders = data.kanbanWorkorders.map((workorder) => {
				let updatedWorkorder = reorderedWorkorders.find((item) => item.id == workorder.id);
				let location = data.kanbanLocations.find((item) => item.id == updatedWorkorder?.location);
				let part = data.kanbanParts.find((item) => item.id == updatedWorkorder?.part);

				if (updatedWorkorder && location && part) {
					return { ...workorder, ...updatedWorkorder, location: location, part: part };
				} else {
					return workorder;
				}
			});
			console.log(data.kanbanWorkorders);
			toast.push(`Updated ${reorderedWorkorders.length} workorders in ${location.name}`);
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
			on:locationDelete={(e) => onLocationDelete(e.detail)}
			on:locationReorder={(e) => onLocationReorder(e.detail)}
			bind:showModal={showLocationsModal}
			Locations={data.kanbanLocations}
		/>
		<ManagePartModal
			on:partCreate={(e) => onPartCreate(e.detail)}
			on:partDelete={(e) => onPartDelete(e.detail)}
			bind:showModal={showPartsModal}
			Parts={data.kanbanParts}
		/>
		<div class="flex justify-center">
			<KanbanBoard
				on:workorderDelete={(e) => onWorkorderDelete(e.detail)}
				on:workorderColumnReorder={(e) => onWorkorderColumnReorder(e.detail)}
				Locations={data.kanbanLocations}
				WorkOrders={data.kanbanWorkorders}
			/>
		</div>
	</div>
</div>
