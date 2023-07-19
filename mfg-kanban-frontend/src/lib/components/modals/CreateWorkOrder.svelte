<script lang="ts">
	import ModalTemplate from './ModalTemplate.svelte';

	export let showModal: boolean;

	async function submit() {
		console.log('submit pressed');
	}
</script>

<ModalTemplate bind:showModal modalTitle="Create Work Order">
	<div class="my-2 mx-2">
		<form on:submit|preventDefault={submit}>
			<div class="grid grid-cols-1 gap-6">
				<div class="block">
					<span class="text-gray-600">Name</span>
					<input class="block w-full" type="text" required placeholder="Work Order Name" />
				</div>
				<div class="block">
					<span class="text-gray-600">Location</span>
					<select class="block w-full">
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
					</select>
				</div>
			</div>
			<button
				class="my-2 py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
				type="submit">Create</button
			>
		</form>
	</div>
</ModalTemplate>
