<script lang="ts">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	let testlist: HTMLElement;
	onMount(() => {
		let sortablelist = Sortable.create(testlist);
	});

	async function submit() {
		console.log('submit pressed');
	}
</script>

<button
	class="rounded-lg bg-blue-400 px-4 py-4 text-white"
	on:click={() => toast.push('Hello world!')}>SHOW TOAST</button
>
<ul bind:this={testlist}>
	<li>item 1</li>
	<li>item 2</li>
	<li>item 3</li>
</ul>

<div class="mx-2 my-2">
	<form on:submit|preventDefault={submit}>
		<div class="grid grid-cols-1 gap-6">
			<div class="block">
				<span class="text-gray-600">Name</span>
				<input class="block w-full" type="text" required placeholder="Work Order Name" />
			</div>
			<div class="block">
				<span class="text-gray-600">Location</span>
				<select class="block w-full">
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</select>
			</div>
		</div>
		<button
			class="my-2 rounded-full bg-blue-600 px-4 py-2 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600"
			type="submit">Create</button
		>
	</form>
</div>

<div class="h-96 w-fit bg-green-400">
	<div class="container mx-auto h-96 w-10 bg-blue-400" />
</div>
