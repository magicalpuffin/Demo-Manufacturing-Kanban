<script lang="ts">
	export let buttonName: string;
	export let modalTitle: string;

	let modalElement: HTMLDialogElement;
</script>

<button class="btn btn-primary" on:click={() => modalElement.showModal()}>{buttonName}</button>
<dialog bind:this={modalElement} class="modal">
	<div class="modal-box container max-w-2xl">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<span>{modalTitle}</span>
		<slot />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
