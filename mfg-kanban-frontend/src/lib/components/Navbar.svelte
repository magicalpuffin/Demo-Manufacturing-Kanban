<script lang="ts">
	import {
		showCreateCardModal,
		showLocationsModal,
		showPartsModal
	} from '$lib/stores/modal_stores';
</script>

<!-- <div class="flex flex-row items-center gap-2 border-b py-2"> -->
<div class="navbar bg-base-100 gap-2 border-b">
	<a class="px-4 py-2 text-xl font-bold hover:text-blue-400 md:text-2xl" href="/"
		>Manufacturing Kanban</a
	>
	<button
		class="btn"
		on:click={() => {
			showCreateCardModal.set(true);
		}}>Create Card</button
	>
	<button
		class="btn"
		on:click={() => {
			showLocationsModal.set(true);
		}}>Locations</button
	>
	<button
		class="btn"
		on:click={() => {
			showPartsModal.set(true);
		}}>Parts</button
	>
</div>
