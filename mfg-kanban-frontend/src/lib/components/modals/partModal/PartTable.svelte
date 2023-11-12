<script lang="ts">
	import type { PartType } from '$lib/types';
	import type { Writable } from 'svelte/store';

	import { createEventDispatcher } from 'svelte';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let Parts: Writable<PartType[]>;

	const dispatch = createEventDispatcher<{ partDelete: PartType }>();
</script>

<span class="mt-2 text-gray-600">Parts Table</span>
<table class="table">
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each $Parts as Part}
			<tr class="hover:bg-primary">
				<td>{Part.name}</td>
				<td>{Part.description}</td>
				<td
					><button
						class="btn btn-circle btn-xs btn-ghost hover:text-error"
						on:click={() => {
							// TODO, add popup warning
							dispatch('partDelete', Part);
						}}><CancelIcon /></button
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>
