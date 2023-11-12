<script lang="ts">
	import type { Writable } from 'svelte/store';
	export let text: string;
</script>

<button class="btn btn-primary">{text} </button>
