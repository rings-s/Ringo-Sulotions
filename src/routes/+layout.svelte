<script lang="ts">
  import '$lib/i18n'; // Import to initialize
  import { locale, waitLocale, isLoading } from 'svelte-i18n';
  import '../app.scss';
  import Navigation from '$lib/components/Navigation.svelte';
  // import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let ready = false;

  $: if (browser && $locale) {
    document.documentElement.lang = $locale;
    document.documentElement.dir = $locale === 'ar' ? 'rtl' : 'ltr';
  }

  onMount(async () => {
    if (browser) {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      await waitLocale();
      ready = true;
      // Smooth scroll behavior
      gsap.to('body', {
        scrollBehavior: 'smooth'
      });
    }
  });
</script>
  
  <Navigation />
  <main>
	{#if browser}
	  {#if !$isLoading && ready}
		<slot />
	  {:else}
		<div class="loading">Loading...</div>
	  {/if}
	{:else}
	  <slot />
	{/if}
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