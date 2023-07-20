<script lang="ts">
	import { clickOutside, focusOutside } from '$lib/utils/customEvents';
	import CancelIcon from '$lib/icons/CancelIcon.svelte';
	export let showModal: boolean;
	export let modalTitle: string;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)} class="p-0 rounded-lg my-24">
	<div
		use:clickOutside
		on:click_outside={() => {
			dialog.close();
		}}
		class="px-4 py-4 md:max-w-xl container"
	>
		<div class="flex flex-row justify-between align-middle">
			<h1 class="text-2xl font-bold">{modalTitle}</h1>
			<button
				class="hover:bg-gray-300 rounded-full px-1 py-1 hover:text-red-600"
				on:click={() => {
					dialog.close();
				}}
			>
				<CancelIcon />
			</button>
		</div>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		width: auto;
	}
	dialog:modal {
		max-width: auto;
	}
</style>
