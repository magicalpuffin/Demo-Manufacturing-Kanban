declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:click_outside'?: (event: any) => any;
		'on:focusin_outside'?: (event: any) => any;
	}
}
