<script lang="ts">
  import '$lib/i18n'; // Import to initialize
  import { locale } from 'svelte-i18n';
  import '../app.scss';
  import Navigation from '$lib/components/Navigation.svelte';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  $: if (browser && $locale) {
    document.documentElement.lang = $locale;
    document.documentElement.dir = $locale === 'ar' ? 'rtl' : 'ltr';
  }

  onMount(async () => {
    if (browser) {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        // Smooth scroll behavior
        gsap.to('body', {
          scrollBehavior: 'smooth'
        });
      } catch (error) {
        console.warn('GSAP loading failed:', error);
      }
    }
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
	
	.loading {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  min-height: 100vh;
	  color: var(--light);
	  font-size: 1.2rem;
	}
  </style>