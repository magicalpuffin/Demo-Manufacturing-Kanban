<script lang="ts">
	import type { LocationType, WorkOrderDetailType } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	import ModalTemplate from '$lib/components/modals/ModalTemplate.svelte';
	import LocationReorder from './LocationReorder.svelte';

	import { onLocationCreate, onLocationDelete, onLocationReorder } from '$lib/utils/location_utils';

	export let Locations: Writable<LocationType[]>;
	export let WorkOrders: Writable<WorkOrderDetailType[]>;

	let locationName: string;
	let locationSequence: number;

	async function submit() {
		let partialLocation: Partial<LocationType> = {
			name: locationName,
			sequence: locationSequence
		};
		onLocationCreate(partialLocation, Locations);
	}
</script>

<ModalTemplate buttonName="Locations" modalTitle="Manage Location">
	<form on:submit|preventDefault={submit}>
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
	<LocationReorder
		on:locationDelete={(e) => onLocationDelete(e.detail, Locations, WorkOrders)}
		on:locationReorder={(e) => onLocationReorder(e.detail, Locations)}
		{Locations}
	/>
</ModalTemplate>
