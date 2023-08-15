<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ModalTemplate from './ModalTemplate.svelte';
	import type { LocationType, PartType, WorkOrderDetailType, WorkOrderType } from '$lib/types';

	export let showModal: boolean;
	// temporary, should get locations, parts from fetch
	export let Locations: LocationType[];
	export let Parts: PartType[];

	const dispatch = createEventDispatcher();

	let workorderName: string;
	let workorderPriority: number;
	let locationId: number;
	let partId: number;

	async function submit() {
		let partialWorkorder: Partial<WorkOrderType> = {
			name: workorderName,
			priority: workorderPriority,
			location: locationId,
			part: partId
		};
		dispatch('workorderCreate', partialWorkorder);
	}
</script>

<ModalTemplate bind:showModal modalTitle="Create Work Order">
	<div class="mx-2 my-2">
		<form on:submit|preventDefault={submit}>
			<div class="grid grid-cols-1 gap-6">
				<div class="block">
					<span class="text-gray-600">Name</span>
					<input
						bind:value={workorderName}
						class="block w-full"
						type="text"
						required
						placeholder="Work Order Name"
					/>
				</div>
				<div class="block">
					<span class="text-gray-600">Priority</span>
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
					<span class="text-gray-600">Location</span>
					<select bind:value={locationId} class="block w-full">
						{#each Locations as Location}
							<option value={Location.id}>{Location.name}</option>
						{/each}
					</select>
				</div>
				<div class="block">
					<span class="text-gray-600">Part</span>
					<select bind:value={partId} class="block w-full">
						{#each Parts as Part}
							<option value={Part.id}>{Part.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<button
				class="my-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600"
				type="submit">Create</button
			>
		</form>
	</div>
</ModalTemplate>
