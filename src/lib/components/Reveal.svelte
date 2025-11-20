<script>
	import { onMount } from 'svelte';

	let { children, class: className = '', delay = 0 } = $props();
	let element = $state();
	let isVisible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		if (element) observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class="transition-all duration-[1500ms] ease-out {className}"
	style="transition-delay: {delay}ms; opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible
		? 0
		: 30}px);"
>
	{@render children()}
</div>
