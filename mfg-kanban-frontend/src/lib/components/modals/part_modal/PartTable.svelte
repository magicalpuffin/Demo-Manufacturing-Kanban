<script lang="ts">
	import type { PartType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let Parts: PartType[];
	const dispatch = createEventDispatcher<{ partDelete: PartType }>();
</script>

<span class="mt-2 text-gray-600">Parts Table</span>
<div>
	<article class="prose">
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each Parts as Part}
					<tr>
						<td>{Part.name}</td>
						<td>{Part.description}</td>
						<td
							><button
								class="rounded-full hover:bg-gray-300 hover:text-red-600"
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
	</article>
</div>
