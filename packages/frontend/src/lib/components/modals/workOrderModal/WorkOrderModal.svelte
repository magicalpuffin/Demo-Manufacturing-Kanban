<script lang="ts">
	import type { PartSelect, WorkOrderInsert, LocationSelect } from '$lib/types';

	// import { createEventDispatcher } from 'svelte';
	import ModalTemplate from '$lib/components/modals/ModalTemplate.svelte';

	import { locationStore, partStore, workorderStore } from '$lib/stores';

	let workorderName: string;
	let workorderPriority: number;
	let locationId: number;
	let partId: number;

	// const dispatch = createEventDispatcher();

	async function submit() {
		let partialWorkorder: Partial<WorkOrderInsert> = {
			name: workorderName,
			priority: workorderPriority,
			locationId: locationId,
			partId: partId
		};
		workorderStore.add(partialWorkorder);
	}
</script>

<ModalTemplate buttonName="Create Work Order" modalTitle="Create Work Order" let:modalElement>
	<form
		on:submit|preventDefault={() => {
			submit();
			modalElement.close();
		}}
	>
		<div class="grid grid-cols-1 gap-6">
			<div class="block">
				<span class="text-neutral">Name</span>
				<input
					bind:value={workorderName}
					class="block w-full"
					type="text"
					required
					placeholder="Work Order Name"
				/>
			</div>
			<div class="block">
				<span class="text-neutral">Priority</span>
				<input
					bind:value={workorderPriority}
					class="block w-full"
					type="number"
					min="0"
					required
					placeholder="1"
				/>
			</div>
			<div class="block">
				<span class="text-neutral">Location</span>
				<select bind:value={locationId} class="block w-full">
					{#each $locationStore as Location}
						<option value={Location.id}>{Location.name}</option>
					{/each}
				</select>
			</div>
			<div class="block">
				<span class="text-neutral">Part</span>
				<select bind:value={partId} class="block w-full">
					{#each $partStore as Part}
						<option value={Part.id}>{Part.name}</option>
					{/each}
				</select>
			</div>
		</div>
		<button class="btn btn-primary my-2 rounded-lg px-4 py-2" type="submit">Create</button>
	</form>
</ModalTemplate>
