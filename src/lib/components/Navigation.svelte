<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { locale, _ } from 'svelte-i18n';

    let isMenuOpen = false;

    const navItems = [
      { label: 'nav.home', href: '#home' },
      { label: 'nav.about', href: '#about' },
      { label: 'nav.services', href: '#services' },
      { label: 'nav.contact', href: '#contact' }
    ];
    
    onMount(() => {
      gsap.fromTo('.nav-logo', 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
      );
      
      gsap.fromTo('.nav-item',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    });
    
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }

    function setLocale(lang: string) {
      locale.set(lang);
    }
  </script>
  
  <nav class="navigation">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <span class="logo-text">Ringo</span>
        <span class="logo-accent">Solutions</span>
      </a>
      
      <div class="nav-menu" class:active={isMenuOpen}>
        {#each navItems as item}
          <a 
            href={item.href} 
            class="nav-item"
            class:current={$page.url.pathname === item.href}
            on:click={() => isMenuOpen = false}
          >
            {$_(item.label)}
          </a>
        {/each}
        <div class="lang-switcher">
          <button on:click={() => setLocale('en')} class:active={$locale?.startsWith('en')}>EN</button>
          <button on:click={() => setLocale('ar')} class:active={$locale === 'ar'}>AR</button>
        </div>
      </div>
      
      <button class="menu-toggle" on:click={toggleMenu} aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
  
  <style lang="scss">
    .navigation {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      backdrop-filter: blur(10px);
      background: rgba(15, 15, 20, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-logo {
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 800;
      font-family: var(--font-display);
      
      .logo-text {
        color: var(--light);
      }
      
      .logo-accent {
        background: var(--gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
    
    .nav-menu {
      display: flex;
      gap: 3rem;
      
      @media (max-width: 768px) {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        height: 100vh;
        background: var(--dark);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.3s ease;
        
        &.active {
          right: 0;
        }
      }
    }
    
    .nav-item {
      color: var(--gray);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--primary);
        transition: width 0.3s ease;
      }
      
      &:hover, &.current {
        color: var(--light);
        
        &:after {
          width: 100%;
        }
      }
    }
    
    .lang-switcher {
      display: flex;
      gap: 0.5rem;
      margin-left: 2rem;

      button {
        background: none;
        border: 1px solid transparent;
        color: var(--gray);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 5px;
        transition: all 0.3s ease;

        &.active {
          color: var(--light);
          border-color: var(--primary);
        }

        &:hover:not(.active) {
          color: var(--light);
        }
      }

      @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 2rem;
      }
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1001;
      
      span {
        width: 25px;
        height: 2px;
        background: var(--light);
        transition: all 0.3s ease;
      }
      
      @media (max-width: 768px) {
        display: flex;
      }
    }
  </style>