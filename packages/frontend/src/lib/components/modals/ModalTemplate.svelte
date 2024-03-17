<script lang="ts">
	export let buttonName: string;
	export let modalTitle: string;

	let modalElement: HTMLDialogElement;
</script>

<button class="btn btn-primary" on:click={() => modalElement.showModal()}>{buttonName}</button>
<dialog bind:this={modalElement} class="modal">
	<div class="container modal-box max-w-2xl">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>
		<span class="text-2xl font-medium">{modalTitle}</span>
		<slot {modalElement} />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
