<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispath = createEventDispatcher();
</script>

<nav class="py-2 flex flex-row items-center gap-2 border-b">
	<a class="px-4 py-2 text-xl font-bold hover:text-blue-400 md:text-2xl" href="/"
		>Manufacturing Kanban</a
	>
	<button
		class="rounded-xl text-white border bg-blue-600 py-2 px-2 hover:text-blue-600 hover:bg-white border-blue-600"
		on:click={() => {
			dispath('clickCreateCard');
		}}>Create Card</button
	>
	<button
		class="rounded-xl text-white border bg-blue-600 py-2 px-2 hover:text-blue-600 hover:bg-white border-blue-600"
		on:click={() => {
			dispath('clickLocations');
		}}>Locations</button
	>
	<button
		class="rounded-xl text-white border bg-blue-600 py-2 px-2 hover:text-blue-600 hover:bg-white border-blue-600"
		on:click={() => {
			dispath('clickParts');
		}}>Parts</button
	>
</nav>
