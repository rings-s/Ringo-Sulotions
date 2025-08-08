<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { locale, _ } from 'svelte-i18n';

  let isMenuOpen = false;
  let scrolled = false;

  const navItems = [
    { label: 'nav.home', href: '#home' },
    { label: 'nav.about', href: '#about' },
    { label: 'nav.services', href: '#services' },
    { label: 'nav.contact', href: '#contact' }
  ];
  
  onMount(async () => {
    const { gsap } = await import('gsap');
    // Animate logo on load
    gsap.fromTo('.logo-svg', 
      { opacity: 0, scale: 0.5, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: 'power3.out' }
    );
    
    gsap.fromTo('.logo-text',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
    
    gsap.fromTo('.nav-item',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
    );
    
    // Continuous rotation for inner shape
    gsap.to('.logo-inner-shape', {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1
    });
    
    // Pulse effect on logo
    gsap.to('.logo-glow', {
      opacity: 0.8,
      scale: 1.2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function setLocale(lang: string) {
    locale.set(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
</script>

<nav class="navigation" class:scrolled>
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <div class="logo-mark">
        <svg class="logo-svg" width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#10B981;stop-opacity:1" />
            </linearGradient>
            
            <linearGradient id="logoGradientReverse" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#6366F1;stop-opacity:1" />
            </linearGradient>
            
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Background glow -->
          <circle class="logo-glow" cx="50" cy="50" r="30" fill="url(#logoGradient)" opacity="0.1"/>
          
          <!-- Main octahedron shape -->
          <g transform="translate(50, 50)">
            <!-- Outer octahedron -->
            <path d="M 0,-25 L 22,0 L 0,25 L -22,0 Z" 
                  stroke="url(#logoGradient)" 
                  stroke-width="2" 
                  fill="none" 
                  opacity="0.9"
                  filter="url(#logoGlow)"/>
            
            <!-- Center cross -->
            <path d="M 0,-25 L 0,25 M -22,0 L 22,0" 
                  stroke="url(#logoGradient)" 
                  stroke-width="1" 
                  fill="none" 
                  opacity="0.5"/>
            
            <!-- Inner rotating shape -->
            <g class="logo-inner-shape">
              <path d="M 0,-15 L 13,0 L 0,15 L -13,0 Z" 
                    stroke="url(#logoGradientReverse)" 
                    stroke-width="1" 
                    fill="none" 
                    opacity="0.7"/>
              
              <!-- Corner dots -->
              <circle cx="0" cy="-15" r="2" fill="#6366F1">
                <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="13" cy="0" r="2" fill="#3B82F6">
                <animate attributeName="r" values="2;3;2" dur="2s" begin="0.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="0" cy="15" r="2" fill="#10B981">
                <animate attributeName="r" values="2;3;2" dur="2s" begin="1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="-13" cy="0" r="2" fill="#3B82F6">
                <animate attributeName="r" values="2;3;2" dur="2s" begin="1.5s" repeatCount="indefinite"/>
              </circle>
            </g>
            
            <!-- Center R letter -->
            <text x="0" y="4" 
                  text-anchor="middle" 
                  font-family="var(--font-display)" 
                  font-size="12" 
                  font-weight="900" 
                  fill="url(#logoGradient)" 
                  opacity="0.9">
              R
            </text>
          </g>
          
          <!-- Orbital ring -->
          <ellipse cx="50" cy="50" rx="35" ry="15" 
                   stroke="url(#logoGradient)" 
                   stroke-width="0.5" 
                   fill="none" 
                   opacity="0.3" 
                   transform="rotate(45 50 50)">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="45 50 50"
              to="405 50 50"
              dur="30s"
              repeatCount="indefinite"/>
          </ellipse>
        </svg>
      </div>
      
      <div class="logo-text">
        <span class="logo-main">Ringo</span>
        <span class="logo-accent">Solutions</span>
      </div>
    </a>
    
    <div class="nav-menu" class:active={isMenuOpen}>
      {#each navItems as item}
        <a 
          href={item.href} 
          class="nav-item"
          class:current={$page.url.hash === item.href}
          on:click={() => isMenuOpen = false}
        >
          <span class="nav-item-text">{$_(item.label)}</span>
          <div class="nav-item-indicator"></div>
        </a>
      {/each}
      
      <div class="lang-switcher">
        <div class="lang-switcher-bg"></div>
        <button 
          on:click={() => setLocale('en')} 
          class:active={$locale === 'en'}
          aria-label="English"
        >
          EN
        </button>
        <button 
          on:click={() => setLocale('ar')} 
          class:active={$locale === 'ar'}
          aria-label="العربية"
        >
          AR
        </button>
      </div>
    </div>
    
    <button class="menu-toggle" on:click={toggleMenu} aria-label="Menu">
      <div class="menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
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
    background: rgba(10, 10, 15, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.scrolled {
      background: rgba(10, 10, 15, 0.95);
      backdrop-filter: blur(20px);
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.5),
        0 1px 0 rgba(99, 102, 241, 0.1);
      
      .logo-svg {
        transform: scale(0.9);
      }
    }
  }
  
  .nav-container {
    max-width: var(--container-2xl);
    margin: 0 auto;
    padding: 1rem var(--mx-desktop);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 1024px) {
      padding: 1rem var(--mx-tablet);
    }
    
    @media (max-width: 640px) {
      padding: 1rem var(--mx-mobile);
    }
  }
  
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    position: relative;
    
    &:hover {
      .logo-svg {
        transform: scale(1.1) rotate(5deg);
      }
      
      .logo-text {
        transform: translateX(2px);
      }
    }
    
    .logo-mark {
      position: relative;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .logo-svg {
        width: 100%;
        height: 100%;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3));
      }
    }
    
    .logo-text {
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;
      
      .logo-main {
        font-size: 1.5rem;
        font-weight: 900;
        font-family: var(--font-display);
        color: var(--light);
        line-height: 1;
        letter-spacing: -0.02em;
        background: linear-gradient(90deg, var(--light) 0%, rgba(255, 255, 255, 0.9) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .logo-accent {
        font-size: 0.75rem;
        font-weight: 500;
        background: var(--gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        opacity: 0.9;
      }
    }
  }
  
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    
    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100vh;
      background: linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%);
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
    padding: 0.75rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    &-text {
      position: relative;
      z-index: 2;
    }
    
    &-indicator {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: var(--gradient);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 2px;
      
      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: 0;
        right: 0;
        bottom: -2px;
        background: var(--gradient);
        filter: blur(4px);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
    
    &:hover, &.current {
      color: var(--light);
      
      .nav-item-indicator {
        width: 100%;
        
        &::before {
          opacity: 0.5;
        }
      }
    }
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
      
      .nav-item-indicator {
        height: 3px;
      }
    }
  }
  
  .lang-switcher {
    display: flex;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    padding: 0.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    
    .lang-switcher-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--gradient);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 50px;
    }

    button {
      background: none;
      border: none;
      color: var(--gray);
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 600;
      font-size: 0.875rem;
      position: relative;
      z-index: 1;

      &.active {
        background: var(--gradient);
        color: var(--light);
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }

      &:hover:not(.active) {
        color: var(--light);
        transform: scale(1.05);
      }
    }
    
    &:hover {
      border-color: rgba(99, 102, 241, 0.3);
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
    }
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
    padding: 0.5rem;
    
    .menu-icon {
      width: 30px;
      height: 24px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      span {
        width: 100%;
        height: 2px;
        background: var(--light);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 2px;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 2px;
        }
      }
    }
    
    &:hover {
      .menu-icon span::after {
        opacity: 1;
      }
    }
    
    @media (max-width: 768px) {
      display: block;
    }
  }
  
  // Animation for mobile menu open state
  .nav-menu.active {
    & ~ .menu-toggle {
      .menu-icon {
        span:nth-child(1) {
          transform: rotate(45deg) translateY(11px);
        }
        
        span:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }
        
        span:nth-child(3) {
          transform: rotate(-45deg) translateY(-11px);
        }
      }
    }
  }
  
  // RTL Support
  :global(html[dir="rtl"]) {
    .nav-container {
      direction: rtl;
    }
    
    .nav-logo {
      flex-direction: row-reverse;
      
      .logo-text {
        align-items: flex-end;
      }
    }
    
    .nav-item-indicator {
      left: auto;
      right: 50%;
      transform: translateX(50%);
    }
    
    .nav-menu {
      @media (max-width: 768px) {
        right: auto;
        left: -100%;
        
        &.active {
          left: 0;
        }
      }
    }
  }
  
  // Premium hover effects
  @media (min-width: 769px) {
    .nav-item {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        transition: width 0.3s ease, height 0.3s ease;
      }
      
      &:hover::before {
        width: 100px;
        height: 100px;
      }
    }
  }
</style>