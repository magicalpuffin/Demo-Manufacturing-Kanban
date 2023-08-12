<script lang="ts">
	import type { PartType } from '$lib/types';

	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let Parts: PartType[];
</script>

<span class="text-gray-600 mt-2">Parts Table</span>
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
							><button class="hover:bg-gray-300 rounded-full hover:text-red-600" on:click={() => {}}
								><CancelIcon /></button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</article>
</div>
