<script lang="ts">
	import type { PartSelect } from '$lib/types';
	import type { Writable } from 'svelte/store';

	import { createEventDispatcher } from 'svelte';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let Parts: PartSelect[];

	const dispatch = createEventDispatcher<{ partDelete: PartSelect }>();
</script>

<span class="mt-2 text-xl font-medium">Parts Table</span>
<table class="table">
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each Parts as Part}
			<tr class="hover:bg-primary">
				<td>{Part.name}</td>
				<td>{Part.description}</td>
				<td
					><button
						class="btn btn-circle btn-ghost btn-xs hover:text-error"
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
