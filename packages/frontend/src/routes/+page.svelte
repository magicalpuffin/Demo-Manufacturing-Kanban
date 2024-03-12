<script lang="ts">
	import type { PageData } from './$types';

	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import KanbanBoard from '$lib/components/kanban/KanbanBoard.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { json } from '@sveltejs/kit';

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
		}}
	/>
	<div class="grow overflow-x-auto">
		<KanbanBoard LocationDetailList={locationDetailList} />
	</div>
</div>
