<script lang="ts">
	import type { LocationType } from '$lib/types';
	import { onMount } from 'svelte';

	import Sortable from 'sortablejs';
	import ModalTemplate from './ModalTemplate.svelte';

	export let showModal: boolean;
	// temporary, should get locations, parts from fetch
	export let Locations: LocationType[];

	let locationName: string;
	let locationSequence: number;

	async function submit() {}

	let sortableEle: HTMLElement;
	let sortableObj: Sortable;

	onMount(() => {
		sortableObj = Sortable.create(sortableEle, {
			group: 'location',
			animation: 150,
			ghostClass: 'blue-background-class',
			onEnd: function (evt) {
				// Need to figure out how update database
				console.log('sort ended');
			}
		});
	});
</script>

<ModalTemplate bind:showModal modalTitle="Mange Location">
	<div class="my-2 mx-2">
		<div class="flex flex-row">
			<form on:submit|preventDefault={submit}>
				<div class="grid grid-cols-1 gap-6">
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
				</div>
				<button
					class="my-2 py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
					type="submit">Create</button
				>
			</form>
			<div class="flex flex-col">
				<div bind:this={sortableEle} class="">
					{#each Locations as Location}
						<div class="font-semibold border shadow-md rounded-lg">
							{Location.name}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</ModalTemplate>
