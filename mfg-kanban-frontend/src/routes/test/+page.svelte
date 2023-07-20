<script lang="ts">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	let testlist: HTMLElement;
	onMount(() => {
		let sortablelist = Sortable.create(testlist);
	});

	async function submit() {
		console.log('submit pressed');
	}
</script>

<ul bind:this={testlist}>
	<li>item 1</li>
	<li>item 2</li>
	<li>item 3</li>
</ul>

<div class="my-2 mx-2">
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
			class="my-2 py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
			type="submit">Create</button
		>
	</form>
</div>

<div class="bg-green-400 w-fit h-96">
	<div class="container h-96 w-10 bg-blue-400 mx-auto" />
</div>
