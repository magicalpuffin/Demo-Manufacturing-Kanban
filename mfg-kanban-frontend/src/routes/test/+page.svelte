<script lang="ts">
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';

	let testlist: HTMLElement;
	onMount(() => {
		let sortablelist = Sortable.create(testlist);
	});
</script>

<ul bind:this={testlist}>
	<li>item 1</li>
	<li>item 2</li>
	<li>item 3</li>
</ul>
