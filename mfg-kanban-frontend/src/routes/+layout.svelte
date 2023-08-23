<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	const toast_options = {};
</script>

<SvelteToast options={toast_options} />
<slot />
