<script lang="ts">
  export let data: { lang: string };
  import "../app.scss";
  import Navigation from "$lib/components/Navigation.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // Reactive language state with proper fallback
  $: currentLang = data?.lang || 'en';
  $: isRTL = currentLang === 'ar';

  // Set document attributes safely after mount
  onMount(async () => {
    if (browser && document && document.body) {
      // Set language and direction attributes
      document.documentElement.lang = currentLang;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      
      // Set smooth scrolling via CSS instead of GSAP
      document.documentElement.style.scrollBehavior = 'smooth';
      
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        
        // Mark body as hydrated for CSS transition
        document.body.classList.add('hydrated');
        
        // Initialize GSAP with safe DOM checks
        gsap.set("body", { clearProps: "all" });
        
      } catch (error) {
        console.warn("GSAP loading failed:", error);
        // Fallback: still mark as hydrated even if GSAP fails
        document.body.classList.add('hydrated');
      }
    }
  });

  // Update attributes when language changes
  $: if (browser && document) {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }
</script>

<svelte:head>
  <title>Ringo Solutions</title>
  <meta name="description" content="Professional web solutions and services" />
</svelte:head>

<Navigation />
<main>
  <slot />
</main>

<style lang="scss">
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(body) {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
  }
  
  :global(body.hydrated) {
    opacity: 1;
    visibility: visible;
  }
  
  main {
    min-height: 100vh;
    overflow-x: hidden;
  }
</style>
