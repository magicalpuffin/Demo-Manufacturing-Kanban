<script lang="ts">
	import type { PartType } from '$lib/types';

	import ModalTemplate from './ModalTemplate.svelte';
	import PartTable from './PartTable.svelte';

	export let showModal: boolean;
	export let Parts: PartType[];
	async function submit() {}
</script>

<ModalTemplate bind:showModal modalTitle="Manage Part">
	<div class="my-2 mx-2">
		<div class="flex flex-col">
			<form on:submit|preventDefault={submit}>
				<div class="grid grid-cols-1 gap-6">
					<div class="block">
						<span class="text-gray-600">Name</span>
						<input class="block w-full" type="text" required placeholder="Part name" />
					</div>
					<div class="block">
						<span class="text-gray-600">Description</span>
						<textarea class="block w-full" placeholder="Part description" />
					</div>
				</div>
				<button
					class="my-2 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
					type="submit">Create</button
				>
			</form>
			<PartTable {Parts} />
		</div>
	</div>
</ModalTemplate>
