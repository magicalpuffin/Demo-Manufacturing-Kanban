<script lang="ts">
	import type { partInsertType, partSelectType } from '@Demo-Manufacturing-Kanban/core/zodSchema';
	import type { Writable } from 'svelte/store';

	import PartTable from './PartTable.svelte';

	import ModalTemplate from '../ModalTemplate.svelte';
	import { createEventDispatcher } from 'svelte';
	import { partStore } from '$lib/stores';

	let partName: string;
	let partDescription: string;

	// let dispatch = createEventDispatcher();

	async function submit() {
		let partialPart: partInsertType = {
			name: partName,
			description: partDescription
		};
		partStore.add(partialPart);
	}
</script>

<ModalTemplate buttonName="Parts" modalTitle="Manage Part">
	<form on:submit|preventDefault={submit}>
		<div class="grid grid-cols-1 gap-6">
			<div class="block">
				<span class="text-gray-600">Name</span>
				<input
					bind:value={partName}
					class="block w-full"
					type="text"
					required
					placeholder="Part name"
				/>
			</div>
			<div class="block">
				<span class="text-gray-600">Description</span>
				<textarea
					bind:value={partDescription}
					class="block w-full"
					placeholder="Part description"
				/>
			</div>
		</div>
		<button class="btn btn-primary my-2 rounded-lg px-4 py-2" type="submit">Create</button>
	</form>
	<PartTable />
</ModalTemplate>
