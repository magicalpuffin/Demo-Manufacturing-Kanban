<script lang="ts">
	import { kanbanLocations, kanbanParts, kanbanWorkorders } from '$lib/stores/modal_stores';
	import LocationModal from '$lib/components/modals/locationModal/LocationModal.svelte';
	import PartModal from '$lib/components/modals/partModal/PartModal.svelte';
	import WorkOrderModal from '$lib/components/modals/workOrderModal/WorkOrderModal.svelte';
</script>

<div class="navbar bg-base-100 border-b">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">Manufacturing Kanban</a>
	</div>
	<div class="navbar-center gap-2">
		<WorkOrderModal Parts={kanbanParts} Locations={kanbanLocations} Workorders={kanbanWorkorders} />
		<LocationModal Locations={kanbanLocations} WorkOrders={kanbanWorkorders} />
		<PartModal Parts={kanbanParts} WorkOrders={kanbanWorkorders} />
	</div>
	<div class="navbar-end" />
</div>
