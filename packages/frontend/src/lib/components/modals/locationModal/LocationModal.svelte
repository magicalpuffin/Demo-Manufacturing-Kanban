<script lang="ts">
	import type {
		locationInsertType,
		locationSelectType
	} from '@Demo-Manufacturing-Kanban/core/zodSchema';
	import type { Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	import ModalTemplate from '$lib/components/modals/ModalTemplate.svelte';
	import LocationReorder from './LocationReorder.svelte';

	import { locationStore } from '$lib/stores';

	let locationName: string;
	let locationSequence: number;

	async function submit() {
		let partialLocation: locationInsertType = {
			name: locationName,
			sequence: locationSequence
		};
		locationStore.add(partialLocation);
	}
</script>

<ModalTemplate buttonName="Locations" modalTitle="Manage Location" let:modalElement>
	<form
		on:submit|preventDefault={() => {
			submit();
			modalElement.close();
		}}
	>
		<div class="my-2 flex flex-row gap-2">
			<div class="block">
				<span class="text-neutral">Name</span>
				<input
					bind:value={locationName}
					class="block w-full"
					type="text"
					required
					placeholder="Location Name"
				/>
			</div>
			<div class="block">
				<span class="text-neutral">Sequence</span>
				<input
					bind:value={locationSequence}
					class="block w-full"
					type="number"
					required
					placeholder="1"
					min="1"
				/>
			</div>
			<button class="btn btn-primary mt-5 px-4 py-2" type="submit">Create</button>
		</div>
	</form>
	<LocationReorder />
</ModalTemplate>
