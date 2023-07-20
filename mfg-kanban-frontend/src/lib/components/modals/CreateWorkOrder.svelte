<script lang="ts">
	import ModalTemplate from './ModalTemplate.svelte';
	import type { LocationType, PartType } from '$lib/types';

	export let showModal: boolean;
	// temporary, should get locations, parts from fetch
	export let Locations: LocationType[];
	export let Parts: PartType[];

	let workorderName: string;
	let locationId: number;
	let partId: number;

	async function submit() {}
</script>

<ModalTemplate bind:showModal modalTitle="Create Work Order">
	<div class="my-2 mx-2">
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
				class="my-2 py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
				type="submit">Create</button
			>
		</form>
	</div>
</ModalTemplate>
