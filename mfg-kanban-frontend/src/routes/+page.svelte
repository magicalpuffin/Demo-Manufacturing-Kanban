<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import CreateCardModal from '$lib/components/modals/CreateWorkOrder.svelte';
	import LocationsModal from '$lib/components/modals/ManageLocationModal.svelte';
	import PartsModal from '$lib/components/modals/ManagePartModal.svelte';

	let showCreateCardModal = false;
	let showLocationsModal = false;
	let showPartsModal = false;
</script>

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
<CreateCardModal bind:showModal={showCreateCardModal} />
<LocationsModal bind:showModal={showLocationsModal} />
<PartsModal bind:showModal={showPartsModal} />
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h1 class="text-3xl font-bold underline border bor">Hello world!</h1>
