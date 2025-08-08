<script lang="ts">
  export let data: { lang: string };
  import "../app.scss";
  import Navigation from "$lib/components/Navigation.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // GSAP animation logic remains here
  onMount(async () => {
    if (browser) {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        gsap.to("body", {
          scrollBehavior: "smooth"
        });
      } catch (error) {
        console.warn("GSAP loading failed:", error);
      }
    }
  });
</script>

<svelte:head>
  <html lang={data.lang} dir={data.lang === "ar" ? "rtl" : "ltr"}></html>
</svelte:head>

{#await data}
  <!-- You can put a loading indicator here if you want -->
{:then}
  <Navigation />
  <main>
    <slot />
  </main>
{/await}

<style lang="scss">
  main {
    min-height: 100vh;
    overflow-x: hidden;
  }
</style>
