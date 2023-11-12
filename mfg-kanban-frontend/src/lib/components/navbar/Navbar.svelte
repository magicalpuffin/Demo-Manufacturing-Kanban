<script lang="ts">
	import {
		showCreateCardModal,
		showLocationsModal,
		showPartsModal
	} from '$lib/stores/modal_stores';

	import NavbarButton from './NavbarButton.svelte';
</script>

<div class="navbar bg-base-100 border-b">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">Manufacturing Kanban</a>
	</div>
	<div class="navbar-center gap-2">
		<NavbarButton modalToggle={showCreateCardModal} text="Create Card" />
		<NavbarButton modalToggle={showLocationsModal} text="Locations" />
		<NavbarButton modalToggle={showPartsModal} text="Parts" />
	</div>
	<div class="navbar-end" />
</div>
