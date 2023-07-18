<script lang="ts">
	import ModalTemplate from './ModalTemplate.svelte';

	export let showModal: boolean;
</script>

<ModalTemplate bind:showModal>This is the Parts Modal</ModalTemplate>
