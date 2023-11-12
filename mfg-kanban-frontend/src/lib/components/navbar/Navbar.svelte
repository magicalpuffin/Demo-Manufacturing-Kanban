<script lang="ts">
	import { kanbanLocations, kanbanParts, kanbanWorkorders } from '$lib/stores/modal_stores';
	import ManageLocationModal from '../modals/location_modal/ManageLocationModal.svelte';
	import ManagePartModal from '../modals/part_modal/ManagePartModal.svelte';
	import CreateWorkOrder from '../modals/workorder_modal/CreateWorkOrder.svelte';

	import NavbarButton from './NavbarButton.svelte';
</script>

<div class="navbar bg-base-100 border-b">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">Manufacturing Kanban</a>
	</div>
	<div class="navbar-center gap-2">
		<CreateWorkOrder
			Parts={kanbanParts}
			Locations={kanbanLocations}
			Workorders={kanbanWorkorders}
		/>
		<ManageLocationModal Locations={kanbanLocations} WorkOrders={kanbanWorkorders} />
		<ManagePartModal Parts={kanbanParts} WorkOrders={kanbanWorkorders} />
	</div>
	<div class="navbar-end" />
</div>
