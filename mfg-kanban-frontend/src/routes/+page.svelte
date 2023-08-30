<script lang="ts">
	import type { LocationType, PartType, WorkOrderDetailType, WorkOrderType } from '$lib/types';
	import type { PageData } from './$types';
	import { PUBLIC_KANBAN_API } from '$env/static/public';

	import { toast } from '@zerodevx/svelte-toast';

	import { kanbanLocations, kanbanParts, kanbanWorkorders } from '$lib/stores/modal_stores';
	import {
		showCreateCardModal,
		showLocationsModal,
		showPartsModal
	} from '$lib/stores/modal_stores';

	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/workorder_modal/CreateWorkOrder.svelte';
	import ManageLocationModal from '$lib/components/modals/location_modal/ManageLocationModal.svelte';
	import ManagePartModal from '$lib/components/modals/part_modal/ManagePartModal.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';

	import { onLocationCreate, onLocationDelete, onLocationReorder } from '$lib/utils/location_utils';
	import { onPartCreate, onPartDelete } from '$lib/utils/part_utils';
	import {
		onWorkorderCreate,
		onWorkorderColumnReorder,
		onWorkorderDelete
	} from '$lib/utils/workorder_utils';

	export let data: PageData;

	kanbanLocations.set(data.kanbanLocations);
	kanbanParts.set(data.kanbanParts);
	kanbanWorkorders.set(data.kanbanWorkorders);

	// console.log(data);
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="flex flex-1 overflow-x-auto">
		<CreateCardModal
			on:workorderCreate={(e) => onWorkorderCreate(e.detail, data.kanbanWorkorders)}
			Locations={data.kanbanLocations}
			Parts={data.kanbanParts}
		/>
		<ManageLocationModal
			on:locationCreate={(e) => onLocationCreate(e.detail, data.kanbanLocations)}
			on:locationDelete={(e) =>
				onLocationDelete(e.detail, data.kanbanLocations, data.kanbanWorkorders)}
			on:locationReorder={(e) => onLocationReorder(e.detail, data.kanbanLocations)}
			Locations={data.kanbanLocations}
		/>
		<ManagePartModal {showPartsModal} Parts={kanbanParts} WorkOrders={kanbanWorkorders} />
		<div class="flex justify-center">
			<KanbanBoard
				on:workorderDelete={(e) => onWorkorderDelete(e.detail, data.kanbanWorkorders)}
				on:workorderColumnReorder={(e) =>
					onWorkorderColumnReorder(
						e.detail,
						data.kanbanWorkorders,
						data.kanbanLocations,
						data.kanbanParts
					)}
				Locations={data.kanbanLocations}
				WorkOrders={data.kanbanWorkorders}
			/>
		</div>
	</div>
</div>
