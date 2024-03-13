<script lang="ts">
	import type { PageData } from './$types';

	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { json } from '@sveltejs/kit';
	import { onWorkorderDelete } from '$lib/utils/workorder_utils';

	export let data: PageData;

	let partsList = data.partList;
	let locationDetailList = data.locationDetailList;
	let workorderDetailList = data.workOrderDetailList;
	// console.log(data);
</script>

<div class="flex h-screen flex-col">
	<Navbar
		kanbanParts={partsList}
		kanbanLocations={locationDetailList}
		on:createWorkorder={async (event) => {
			const response = await fetch(`${PUBLIC_API_URL}/workorder`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(event.detail)
			});
			console.log(event.detail);
			if (response.ok) {
				console.log(await response.json());
			}

			const locationDetailResponse = await fetch(`${PUBLIC_API_URL}/location?detail=true`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			if (locationDetailResponse.ok) {
				locationDetailList = await locationDetailResponse.json();
			}
		}}
	/>
	<div class="grow overflow-x-auto">
		<KanbanBoard
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
		/>
	</div>
</div>
