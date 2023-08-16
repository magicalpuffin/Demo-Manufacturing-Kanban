<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { LocationType } from '$lib/types';

	import ModalTemplate from './ModalTemplate.svelte';
	import LocationReorder from './LocationReorder.svelte';

	export let showModal: boolean;
	export let Locations: LocationType[];

	const dispatch = createEventDispatcher();

	let locationName: string;
	let locationSequence: number;

	async function submit() {
		let partialLocation: Partial<LocationType> = {
			name: locationName,
			sequence: locationSequence
		};
		dispatch('locationCreate', partialLocation);
	}
</script>

<ModalTemplate bind:showModal modalTitle="Mange Location">
	<div class="mx-2 my-2">
		<div class="flex flex-col">
			<form on:submit|preventDefault={submit}>
				<div class="my-2 flex flex-row gap-2">
					<div class="block">
						<span class="text-gray-600">Name</span>
						<input
							bind:value={locationName}
							class="block w-full"
							type="text"
							required
							placeholder="Location Name"
						/>
					</div>
					<div class="block">
						<span class="text-gray-600">Sequence</span>
						<input
							bind:value={locationSequence}
							class="block w-full"
							type="number"
							required
							placeholder="1"
							min="1"
						/>
					</div>
					<button
						class="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600"
						type="submit">Create</button
					>
				</div>
			</form>
			<LocationReorder on:locationDelete {Locations} />
		</div>
	</div>
</ModalTemplate>
