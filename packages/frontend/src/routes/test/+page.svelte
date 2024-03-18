<script lang="ts">
	import { trpc } from '$lib/client';

	const result = trpc.listWorkorder.query();
	// console.log(result);
</script>

{#await result}
	<p>loading</p>
{:then val}
	<p>{JSON.stringify(val)}</p>
{/await}

<button
	on:click={async () => {
		const newWorkorder = await trpc.createWorkorder.mutate({
			name: 'hello',
			locationId: 1,
			partId: 2,
			priority: 1
		});
		console.log(newWorkorder);
	}}>Create workorder</button
>
