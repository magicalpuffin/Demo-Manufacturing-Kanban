<script lang="ts">
	import type { LocationType } from '$lib/types';

	import ModalTemplate from './ModalTemplate.svelte';
	import LocationReorder from './LocationReorder.svelte';

	export let showModal: boolean;
	// temporary, should get locations, parts from fetch
	export let Locations: LocationType[];

	let locationName: string;
	let locationSequence: number;

	async function submit() {}
</script>

<ModalTemplate bind:showModal modalTitle="Mange Location">
	<div class="my-2 mx-2">
		<div class="flex flex-col">
			<form on:submit|preventDefault={submit}>
				<div class="flex flex-row my-2 gap-2">
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
						class="py-2 mt-6 rounded-md px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
						type="submit">Create</button
					>
				</div>
			</form>
			<LocationReorder {Locations} />
		</div>
	</div>
</ModalTemplate>
