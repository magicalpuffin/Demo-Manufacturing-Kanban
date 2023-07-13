<script lang="ts">
	export let showModal: boolean;
	import { clickOutside, focusOutside } from '$lib/utils/customEvents';

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)} class="p-0 rounded-lg">
	<div
		use:clickOutside
		on:click_outside={() => {
			dialog.close();
		}}
		class="w-96 h-96"
	>
		<slot />
	</div>
</dialog>
