<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { clickOutside, focusOutside } from '$lib/utils/customEvents';
	import CancelIcon from '$lib/icons/CancelIcon.svelte';

	export let showModal: Writable<boolean>;
	export let modalTitle: string;
</script>

<div
	on:close={() => showModal.set(false)}
	class="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-40 {$showModal
		? 'block'
		: 'hidden'}"
>
	<div
		use:clickOutside
		on:click_outside={() => {
			showModal.set(false);
		}}
		class="container mx-auto my-24 rounded-lg bg-white px-4 py-4 md:max-w-2xl"
	>
		<div class="flex flex-row justify-between align-middle">
			<h1 class="text-2xl font-bold">{modalTitle}</h1>
			<button
				class="btn btn-ghost btn-sm btn-circle hover:text-error"
				on:click={() => {
					showModal.set(false);
				}}
			>
				<CancelIcon />
			</button>
		</div>
		<slot />
	</div>
</div>
