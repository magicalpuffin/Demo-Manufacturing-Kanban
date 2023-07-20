<script lang="ts">
	import { clickOutside, focusOutside } from '$lib/utils/customEvents';
	import CancelIcon from '$lib/icons/CancelIcon.svelte';
	export let showModal: boolean;
	export let modalTitle: string;
</script>

<div
	on:close={() => (showModal = false)}
	class="bg-black bg-opacity-40 absolute w-full h-full left-0 top-0 z-10 {showModal
		? 'block'
		: 'hidden'}"
>
	<div
		use:clickOutside
		on:click_outside={() => {
			showModal = false;
		}}
		class="px-4 py-4 bg-white container md:max-w-2xl rounded-lg my-24 mx-auto"
	>
		<div class="flex flex-row justify-between align-middle">
			<h1 class="text-2xl font-bold">{modalTitle}</h1>
			<button
				class="hover:bg-gray-300 rounded-full px-1 py-1 hover:text-red-600"
				on:click={() => {
					showModal = false;
				}}
			>
				<CancelIcon />
			</button>
		</div>
		<slot />
	</div>
</div>
