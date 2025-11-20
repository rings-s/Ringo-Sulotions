<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Services from '$lib/components/Services.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Ringo Solutions | Ahmed Bashir Portfolio</title>
  <meta name="description" content="Portfolio of Ahmed Bashir (Ringo), Senior Developer and Founder of Ringo Solutions. Expert in Svelte, Django, and Rails." />
</svelte:head>

<Navbar />

<main>
  <Hero />
  <About />
  <Services />
  <Projects />
  <Contact />
</main>

<Footer />
