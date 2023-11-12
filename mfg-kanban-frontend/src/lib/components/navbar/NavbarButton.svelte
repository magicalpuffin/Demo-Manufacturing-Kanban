<script lang="ts">
	import type { Writable } from 'svelte/store';
	export let modalToggle: Writable<boolean>;
	export let text: string;
</script>

<button
	class="btn btn-primary"
	on:click={() => {
		modalToggle.set(true);
	}}
	>{text}
</button>
