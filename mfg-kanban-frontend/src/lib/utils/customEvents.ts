export function clickOutside(node: HTMLElement) {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('click_outside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export function focusOutside(node: HTMLElement) {
	const handleFocus = (event: Event) => {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('focusin_outside'));
		}
	};

	document.addEventListener('focusin', handleFocus, true);

	return {
		destroy() {
			document.removeEventListener('focusin', handleFocus, true);
		}
	};
}
