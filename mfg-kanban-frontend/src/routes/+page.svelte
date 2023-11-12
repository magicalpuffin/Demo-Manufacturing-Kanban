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

	import Navbar from '$lib/components/navbar/Navbar.svelte';
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
			{showCreateCardModal}
			Workorders={kanbanWorkorders}
			Locations={kanbanLocations}
			Parts={kanbanParts}
		/>
		<ManageLocationModal
			{showLocationsModal}
			Locations={kanbanLocations}
			WorkOrders={kanbanWorkorders}
		/>
		<ManagePartModal {showPartsModal} Parts={kanbanParts} WorkOrders={kanbanWorkorders} />
		<div class="flex justify-center">
			<KanbanBoard Locations={kanbanLocations} Parts={kanbanParts} WorkOrders={kanbanWorkorders} />
		</div>
	</div>
</div>
