<script lang="ts">
	import type { PartType, WorkOrderDetailType } from '$lib/types';
	import type { Writable } from 'svelte/store';

	import PartTable from './PartTable.svelte';

	import { onPartCreate, onPartDelete } from '$lib/utils/part_utils';
	import ModalTemplate from '../ModalTemplate.svelte';

	export let Parts: Writable<PartType[]>;
	export let WorkOrders: Writable<WorkOrderDetailType[]>;

	let partName: string;
	let partDescription: string;

	async function submit() {
		let partialPart: Partial<PartType> = {
			name: partName,
			description: partDescription
		};
		onPartCreate(partialPart, Parts);
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
	<PartTable on:partDelete={(e) => onPartDelete(e.detail, Parts, WorkOrders)} {Parts} />
</ModalTemplate>
