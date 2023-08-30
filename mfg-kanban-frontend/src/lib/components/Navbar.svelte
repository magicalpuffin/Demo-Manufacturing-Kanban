<script lang="ts">
	import {
		showCreateCardModal,
		showLocationsModal,
		showPartsModal
	} from '$lib/stores/show_modal_stores';
</script>

<nav class="flex flex-row items-center gap-2 border-b py-2">
	<a class="px-4 py-2 text-xl font-bold hover:text-blue-400 md:text-2xl" href="/"
		>Manufacturing Kanban</a
	>
	<button
		class="rounded-xl border border-blue-600 bg-blue-600 px-2 py-2 text-white hover:bg-white hover:text-blue-600"
		on:click={() => {
			showCreateCardModal.set(true);
		}}>Create Card</button
	>
	<button
		class="rounded-xl border border-blue-600 bg-blue-600 px-2 py-2 text-white hover:bg-white hover:text-blue-600"
		on:click={() => {
			showLocationsModal.set(true);
		}}>Locations</button
	>
	<button
		class="rounded-xl border border-blue-600 bg-blue-600 px-2 py-2 text-white hover:bg-white hover:text-blue-600"
		on:click={() => {
			showPartsModal.set(true);
		}}>Parts</button
	>
</nav>
