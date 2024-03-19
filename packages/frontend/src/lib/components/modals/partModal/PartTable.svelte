<script lang="ts">
	import CancelIcon from '$lib/icons/CancelIcon.svelte';
	import { partStore } from '$lib/stores';
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
		{#each $partStore as Part}
			<tr class="hover:bg-primary">
				<td>{Part.name}</td>
				<td>{Part.description}</td>
				<td
					><button
						class="btn btn-circle btn-ghost btn-xs hover:text-error"
						on:click={() => {
							if (confirm(`Are you sure you want to delete ${Part.name}?`)) {
								partStore.remove(Part);
							}
						}}><CancelIcon /></button
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>
