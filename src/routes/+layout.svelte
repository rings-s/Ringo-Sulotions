<script lang="ts">
	import '$lib/i18n'; // Import to initialize
	import { init, locale, _ } from 'svelte-i18n';
	import '../app.scss';
	import Navigation from '$lib/components/Navigation.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	
	init({
		fallbackLocale: 'en',
		initialLocale: 'en'
	});

	$: {
		if (typeof document !== 'undefined') {
			document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
		}
	}

	gsap.registerPlugin(ScrollTrigger);
	
	onMount(() => {
	  // Smooth scroll behavior
	  gsap.to('body', {
		scrollBehavior: 'smooth'
	  });
	});
  </script>
  
  <Navigation />
  <main>
	<slot />
  </main>
  
  <style lang="scss">
	main {
	  min-height: 100vh;
	  overflow-x: hidden;
	}
  </style>