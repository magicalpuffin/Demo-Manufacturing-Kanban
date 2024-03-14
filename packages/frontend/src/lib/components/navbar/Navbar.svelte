<script lang="ts">
	// import { kanbanLocations, kanbanParts, kanbanWorkorders } from '$lib/stores/modal_stores';
	import LocationModal from '$lib/components/modals/locationModal/LocationModal.svelte';
	import PartModal from '$lib/components/modals/partModal/PartModal.svelte';
	import WorkOrderModal from '$lib/components/modals/workOrderModal/WorkOrderModal.svelte';
</script>

<div class="navbar border-b bg-base-100">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">Manufacturing Kanban</a>
	</div>
	<div class="navbar-center gap-2">
		<WorkOrderModal />
		<LocationModal />
		<PartModal />
	</div>
	<div class="navbar-end" />
</div>
