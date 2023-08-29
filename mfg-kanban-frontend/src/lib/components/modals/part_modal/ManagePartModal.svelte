<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { PartType } from '$lib/types';

	import ModalTemplate from '$lib/components/modals/ModalTemplate.svelte';
	import PartTable from './PartTable.svelte';

	export let showModal: boolean;
	export let Parts: PartType[];

	const dispatch = createEventDispatcher();

	let partName: string;
	let partDescription: string;

	async function submit() {
		let partialPart: Partial<PartType> = {
			name: partName,
			description: partDescription
		};
		dispatch('partCreate', partialPart);
	}
</script>

<ModalTemplate bind:showModal modalTitle="Manage Part">
	<div class="mx-2 my-2">
		<div class="flex flex-col">
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
				<button
					class="my-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600"
					type="submit">Create</button
				>
			</form>
			<PartTable on:partDelete {Parts} />
		</div>
	</div>
</ModalTemplate>
