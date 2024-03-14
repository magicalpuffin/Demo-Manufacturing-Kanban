<script lang="ts">
	import type { PageData } from './$types';

	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { json } from '@sveltejs/kit';
	import { onWorkorderDelete } from '$lib/utils/workorder_utils';

	import { locationStore, partStore, workorderStore } from '$lib/stores/modal_stores';

	export let data: PageData;

	// kanbanParts.set(data.partList);

	locationStore.set(data.locationDetailList);
	partStore.set(data.partList);
	workorderStore.set(data.workOrderDetailList);

	// let partsList = data.partList;
	// let locationDetailList = data.locationDetailList;
	// let workorderDetailList = data.workOrderDetailList;
	// console.log(data);
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="grow overflow-x-auto">
		<!-- <KanbanBoard
			LocationDetailList={locationDetailList}
			on:deleteWorkorder={async (event) => {
				await onWorkorderDelete(event.detail);
				const locationDetailResponse = await fetch(`${PUBLIC_API_URL}/location?detail=true`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' }
				});
				if (locationDetailResponse.ok) {
					locationDetailList = await locationDetailResponse.json();
				}
			}}
		/> -->
	</div>
</div>
