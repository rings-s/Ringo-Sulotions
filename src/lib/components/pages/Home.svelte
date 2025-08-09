<script lang="ts">
  import { onMount } from 'svelte';
  import { _, locale } from 'svelte-i18n';
  import ThreeBackground from '$lib/components/ThreeBackground.svelte';
  import CustomCursor from '$lib/components/CustomCursor.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  
  onMount(async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    // Advanced hero animations timeline
    const masterTl = gsap.timeline();
    
    // Animate SVG paths
    gsap.set('.hero-svg path', { 
      strokeDasharray: function(this: SVGPathElement) {
        return this.getTotalLength();
      },
      strokeDashoffset: function(this: SVGPathElement) {
        return this.getTotalLength();
      }
    });
    
    masterTl
      .fromTo('.hero-badge',
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-title > *',
        { opacity: 0, y: 100, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero-description',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.hero-cta > *',
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.5'
      )
      .to('.hero-svg path', {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.1,
        ease: 'power2.inOut'
      }, '-=1.5')
      .fromTo('.hero-svg',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=2'
      );
    
    // Floating animation for SVG
    gsap.to('.hero-visual-content', {
      y: -30,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
    
    // Rotation animation for inner shapes
    gsap.to('.rotate-slow', {
      rotation: 360,
      duration: 30,
      ease: 'none',
      repeat: -1
    });
    
    gsap.to('.rotate-fast', {
      rotation: -360,
      duration: 20,
      ease: 'none',
      repeat: -1
    });
    
    // Parallax scroll effects
    gsap.to('.hero-visual', {
      y: -150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
    
    // Glow pulse animation
    gsap.to('.glow-pulse', {
      opacity: 0.8,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
    
    // Service cards enhanced animation
    ScrollTrigger.batch('.service-card', {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8,
            rotateY: -30
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            overwrite: true
          }
        );
      },
      once: true
    });
  });
  
  let services = [];

  $: {
    $locale;
    services = [
      {
        title: $_('home.services.static.title'),
        description: $_('home.services.static.description'),
        icon: '⚡',
        gradient: 'from-blue-500 to-cyan-500'
      },
      {
        title: $_('home.services.webapp.title'),
        description: $_('home.services.webapp.description'),
        icon: '🚀',
        gradient: 'from-purple-500 to-pink-500'
      },
      {
        title: $_('home.services.saas.title'),
        description: $_('home.services.saas.description'),
        icon: '☁️',
        gradient: 'from-green-500 to-teal-500'
      },
      {
        title: $_('home.services.api.title'),
        description: $_('home.services.api.description'),
        icon: '🔌',
        gradient: 'from-orange-500 to-red-500'
      }
    ];
  }
</script>

<ThreeBackground />
<CustomCursor />

<section class="hero">
  <div class="hero-grid-pattern"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-badge">
        <div class="badge-pulse"></div>
        <span class="badge-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 18L6 22L7 15L2 10L9 9L12 2Z" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
          </svg>
        </span>
        <span>{$_('home.subtitle')}</span>
      </div>
      
      <h1 class="hero-title">
        <div class="title-line">
          <span class="title-word">{$_('home.title_part1')}</span>
        </div>
        <div class="title-line">
          <span class="title-word gradient-text">{$_('home.title_part2')}</span>
        </div>
      </h1>
      
      <p class="hero-description">
        {@html $_('home.description')}
      </p>
      
      <div class="hero-cta">
        <a href="#contact" class="btn btn-primary">
          <span class="btn-text">{$_('home.cta_project')}</span>
          <span class="btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
            </svg>
          </span>
        </a>
        <a href="#services" class="btn btn-glass">
          <span class="btn-text">{$_('home.cta_services')}</span>
          <div class="btn-bg"></div>
        </a>
      </div>
    </div>
    
    <div class="hero-visual">
      <div class="hero-visual-content">
        <svg class="hero-svg" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Background glow effects -->
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#10B981;stop-opacity:1" />
            </linearGradient>
            
            <radialGradient id="glowGradient">
              <stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.5" />
              <stop offset="100%" style="stop-color:#6366F1;stop-opacity:0" />
            </radialGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Central glow -->
          <circle cx="300" cy="300" r="200" fill="url(#glowGradient)" class="glow-pulse" opacity="0.3"/>
          
          <!-- Main Octahedron wireframe -->
          <g class="rotate-slow" transform="translate(300, 300)">
            <!-- Outer octahedron -->
            <path d="M 0,-150 L 130,0 L 0,150 L -130,0 Z" 
                  stroke="url(#primaryGradient)" 
                  stroke-width="2" 
                  fill="none" 
                  opacity="0.8"
                  filter="url(#glow)"/>
            <path d="M 0,-150 L 0,150 M -130,0 L 130,0" 
                  stroke="url(#primaryGradient)" 
                  stroke-width="1" 
                  fill="none" 
                  opacity="0.4"/>
            
            <!-- Inner connections -->
            <g class="rotate-fast">
              <path d="M 0,-100 L 87,0 L 0,100 L -87,0 Z" 
                    stroke="#3B82F6" 
                    stroke-width="1" 
                    fill="none" 
                    opacity="0.6"/>
              <circle cx="0" cy="-100" r="4" fill="#6366F1"/>
              <circle cx="87" cy="0" r="4" fill="#3B82F6"/>
              <circle cx="0" cy="100" r="4" fill="#10B981"/>
              <circle cx="-87" cy="0" r="4" fill="#3B82F6"/>
            </g>
          </g>
          
          <!-- Orbital rings -->
          <g transform="translate(300, 300)">
            <ellipse cx="0" cy="0" rx="200" ry="80" 
                     stroke="url(#primaryGradient)" 
                     stroke-width="1" 
                     fill="none" 
                     opacity="0.3" 
                     transform="rotate(45)"/>
            <ellipse cx="0" cy="0" rx="200" ry="80" 
                     stroke="url(#primaryGradient)" 
                     stroke-width="1" 
                     fill="none" 
                     opacity="0.3" 
                     transform="rotate(-45)"/>
          </g>
          
          <!-- Floating nodes -->
          <g class="float-nodes">
            <circle cx="150" cy="150" r="3" fill="#6366F1" opacity="0.8">
              <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="450" cy="200" r="3" fill="#3B82F6" opacity="0.8">
              <animate attributeName="cy" values="200;210;200" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="400" cy="400" r="3" fill="#10B981" opacity="0.8">
              <animate attributeName="cy" values="400;390;400" dur="2.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="200" cy="450" r="3" fill="#3B82F6" opacity="0.8">
              <animate attributeName="cy" values="450;460;450" dur="3.2s" repeatCount="indefinite"/>
            </circle>
          </g>
          
          <!-- Tech grid pattern -->
          <g opacity="0.1">
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#6366F1" stroke-width="0.5"/>
            </pattern>
            <rect width="600" height="600" fill="url(#grid)" />
          </g>
          
          <!-- Agency branding element -->
          <g transform="translate(300, 300)">
            <text x="0" y="5" 
                  text-anchor="middle" 
                  font-family="var(--font-display)" 
                  font-size="24" 
                  font-weight="900" 
                  fill="url(#primaryGradient)" 
                  opacity="0.8">
              R
            </text>
          </g>
        </svg>
        
        <!-- Decorative elements -->
        <div class="floating-badges">
          <div class="badge-float badge-1">
            <span>Frontend Design</span>
          </div>
          <div class="badge-float badge-2">
            <span>Backend Development</span>
          </div>
          <div class="badge-float badge-3">
            <span>Mobile Apps</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="scroll-indicator">
    <span>{$_('home.scroll')}</span>
    <div class="scroll-mouse">
      <div class="scroll-wheel"></div>
    </div>
  </div>
</section>

<style lang="scss">
  .hero {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: clamp(2rem, 6vh, 4rem) 0 clamp(1rem, 3vh, 2rem);
    
    // Enhanced large screen handling
    @media (min-width: 48rem) { // 768px - tablets
      padding: clamp(4rem, 8vh, 6rem) 0 clamp(2rem, 4vh, 3rem);
    }
    
    @media (min-width: 64rem) { // 1024px - small desktops
      padding: clamp(5rem, 10vh, 8rem) 0 clamp(2rem, 4vh, 3rem);
      min-height: 100vh;
    }
    
    @media (min-width: 80rem) { // 1280px - large desktops
      padding: clamp(6rem, 8vh, 8rem) 0 clamp(3rem, 4vh, 4rem);
    }
    
    // Ultra-wide and very large screens
    @media (min-width: 100rem) { // 1600px+
      padding: 8rem 0 4rem;
      max-height: 100vh;
    }
    
    @media (min-width: 120rem) { // 1920px+
      padding: 10rem 0 5rem;
    }
    
    // Handle very small and landscape mobile devices
    @media (max-height: 31.25rem) and (orientation: landscape) {
      min-height: 100vh;
      padding: 1.5rem 0 1rem;
    }
    
    &-grid-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
      background-size: clamp(25px, 5vw, 50px) clamp(25px, 5vw, 50px);
      pointer-events: none;
      opacity: 0.6;
      
      @media (min-width: 48rem) {
        background-size: 40px 40px;
        opacity: 0.8;
      }
      
      @media (min-width: 80rem) {
        background-size: 50px 50px;
        opacity: 1;
      }
      
      @media (min-width: 120rem) {
        background-size: 60px 60px;
      }
    }
    
    .container {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(1.5rem, 4vw, 3rem);
      align-items: center;
      z-index: 2;
      position: relative;
      max-width: min(90vw, 75rem);
      margin: 0 auto;
      padding: 0 clamp(1rem, 3vw, 1.5rem);
      width: 100%;
      text-align: center;
      
      // Two-column layout for larger screens
      @media (min-width: 64rem) {
        grid-template-columns: 1.2fr 1fr; // Better content/visual ratio
        gap: clamp(3rem, 4vw, 5rem);
        text-align: left;
        max-width: min(95vw, 90rem);
        padding: 0 clamp(2rem, 3vw, 3rem);
        align-items: center;
      }
      
      @media (min-width: 80rem) {
        grid-template-columns: 1.3fr 1fr;
        max-width: min(90vw, 100rem);
        gap: 5rem;
        padding: 0 3rem;
      }
      
      @media (min-width: 100rem) {
        grid-template-columns: 1.4fr 1fr;
        max-width: min(85vw, 110rem);
        gap: 6rem;
        padding: 0 4rem;
      }
      
      @media (min-width: 120rem) {
        grid-template-columns: 1.5fr 1fr;
        max-width: 120rem;
        gap: 8rem;
        padding: 0 5rem;
      }
    }
    
    &-content {
      // Better content organization for large screens
      @media (min-width: 64rem) {
        max-width: none;
      }
    }
    
    &-badge {
      display: inline-flex;
      align-items: center;
      gap: clamp(0.5rem, 2vw, 0.75rem);
      padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem);
      background: rgba(99, 102, 241, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 100px;
      color: var(--primary);
      font-weight: 600;
      font-size: clamp(0.75rem, 2.5vw, 0.875rem);
      margin-bottom: clamp(1rem, 3vw, 2rem);
      position: relative;
      max-width: fit-content;
      
      @media (min-width: 48rem) {
        font-size: 0.875rem;
        gap: 0.75rem;
        padding: 0.75rem 1.5rem;
      }
      
      @media (min-width: 80rem) {
        font-size: 0.9rem;
        padding: 0.875rem 1.75rem;
        margin-bottom: 2.5rem;
      }
      
      @media (min-width: 100rem) {
        font-size: 1rem;
        padding: 1rem 2rem;
      }
      
      .badge-pulse {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: 100px;
        background: var(--gradient);
        opacity: 0;
        animation: pulse-ring 2s ease-in-out infinite;
      }
      
      .badge-icon {
        display: flex;
        animation: spin 4s linear infinite;
        
        @media (prefers-reduced-motion: reduce) {
          animation: none;
        }
      }
    }
    
    &-title {
      margin-bottom: clamp(1rem, 3vw, 2rem);
      
      @media (min-width: 80rem) {
        margin-bottom: 2.5rem;
      }
      
      @media (min-width: 100rem) {
        margin-bottom: 3rem;
      }
      
      .title-line {
        overflow: hidden;
        line-height: 1.1;
        
        .title-word {
          display: inline-block;
          font-size: clamp(1.75rem, 12vw, 3.5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.02em;
          
          @media (min-width: 30rem) {
            font-size: clamp(2rem, 10vw, 4rem);
          }
          
          @media (min-width: 48rem) {
            font-size: clamp(2.5rem, 8vw, 5rem);
          }
          
          @media (min-width: 64rem) {
            font-size: clamp(3rem, 6vw, 5.5rem);
            line-height: 0.9;
          }
          
          @media (min-width: 80rem) {
            font-size: clamp(4rem, 5vw, 6.5rem);
            letter-spacing: -0.025em;
          }
          
          @media (min-width: 100rem) {
            font-size: clamp(5rem, 4.5vw, 7.5rem);
            letter-spacing: -0.03em;
          }
          
          @media (min-width: 120rem) {
            font-size: clamp(6rem, 4vw, 8.5rem);
            letter-spacing: -0.035em;
          }
        }
      }
      
      .gradient-text {
        background: var(--gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        position: relative;
        
        &::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: blur(20px);
          opacity: 0.5;
        }
      }
    }
    
    &-description {
      font-size: clamp(0.9rem, 3.5vw, 1.375rem);
      margin: 0 auto clamp(1.5rem, 4vw, 3rem);
      max-width: min(85vw, 35rem);
      line-height: 1.6;
      color: var(--gray);
      
      @media (min-width: 30rem) {
        font-size: clamp(1rem, 3vw, 1.125rem);
        line-height: 1.65;
        max-width: min(80vw, 40rem);
      }
      
      @media (min-width: 48rem) {
        font-size: clamp(1.1rem, 2.5vw, 1.25rem);
        line-height: 1.7;
        max-width: min(75vw, 45rem);
      }
      
      @media (min-width: 64rem) {
        margin: 0 0 clamp(2rem, 4vw, 3rem);
        max-width: 40rem;
        text-align: left;
        font-size: 1.25rem;
      }
      
      @media (min-width: 80rem) {
        font-size: 1.375rem;
        max-width: 45rem;
        line-height: 1.75;
        margin-bottom: 3.5rem;
      }
      
      @media (min-width: 100rem) {
        font-size: 1.5rem;
        max-width: 50rem;
        line-height: 1.8;
        margin-bottom: 4rem;
      }
      
      @media (min-width: 120rem) {
        font-size: 1.625rem;
        max-width: 55rem;
        margin-bottom: 4.5rem;
      }
    }
    
    &-cta {
      display: flex;
      gap: clamp(0.75rem, 3vw, 1.5rem);
      margin-bottom: clamp(1.5rem, 4vw, 3rem);
      flex-direction: column;
      align-items: center;
      
      @media (min-width: 30rem) {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      @media (min-width: 64rem) {
        justify-content: flex-start;
        flex-wrap: nowrap;
        gap: 1.5rem;
      }
      
      @media (min-width: 80rem) {
        gap: 2rem;
      }
      
      @media (min-width: 100rem) {
        gap: 2.5rem;
      }
    }
    
    &-visual {
      position: relative;
      height: clamp(25rem, 40vw, 37.5rem);
      display: none;
      align-items: center;
      justify-content: center;
      
      @media (min-width: 64rem) {
        display: flex;
        height: clamp(30rem, 35vw, 40rem);
      }
      
      @media (min-width: 80rem) {
        height: clamp(35rem, 40vw, 45rem);
      }
      
      @media (min-width: 100rem) {
        height: clamp(40rem, 45vw, 50rem);
      }
      
      @media (min-width: 120rem) {
        height: clamp(45rem, 50vw, 55rem);
      }
      
      &-content {
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 100%;
        
        @media (min-width: 80rem) {
          transform: scale(1.1);
        }
        
        @media (min-width: 100rem) {
          transform: scale(1.2);
        }
        
        @media (min-width: 120rem) {
          transform: scale(1.3);
        }
      }
      
      .hero-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 50px rgba(99, 102, 241, 0.2));
        
        @media (min-width: 80rem) {
          filter: drop-shadow(0 0 60px rgba(99, 102, 241, 0.25));
        }
        
        @media (min-width: 100rem) {
          filter: drop-shadow(0 0 70px rgba(99, 102, 241, 0.3));
        }
        
        @media (prefers-reduced-motion: reduce) {
          animation: none !important;
        }
      }
      
      .floating-badges {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        
        @media (prefers-reduced-motion: reduce) {
          .badge-float {
            animation: none !important;
          }
        }
        
        .badge-float {
          position: absolute;
          padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem);
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 50px;
          font-size: clamp(0.65rem, 1.2vw, 0.875rem);
          font-weight: 600;
          color: var(--primary);
          
          @media (min-width: 80rem) {
            padding: 0.6rem 1.2rem;
            font-size: 0.875rem;
          }
          
          @media (min-width: 100rem) {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
          
          &.badge-1 {
            top: 15%;
            left: -15%;
            animation: float-diagonal 8s ease-in-out infinite;
          }
          
          &.badge-2 {
            top: 55%;
            right: -15%;
            animation: float-diagonal 10s ease-in-out infinite reverse;
          }
          
          &.badge-3 {
            bottom: 15%;
            left: 5%;
            animation: float-diagonal 9s ease-in-out infinite;
          }
        }
      }
    }
  }
  
  // Enhanced button styles
  .btn {
    padding: clamp(0.875rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem);
    border-radius: 100px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: clamp(0.5rem, 1.5vw, 0.75rem);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    justify-content: center;
    font-size: clamp(0.875rem, 2.5vw, 1rem);
    min-height: 3rem;
    min-width: 8rem;
    flex-shrink: 0;
    
    @media (min-width: 30rem) {
      min-height: 3.125rem;
      min-width: 9rem;
    }
    
    @media (min-width: 48rem) {
      padding: 1rem 2rem;
      min-height: 3.25rem;
      min-width: 10rem;
      font-size: 1rem;
    }
    
    @media (min-width: 80rem) {
      padding: 1.125rem 2.5rem;
      min-height: 3.5rem;
      min-width: 11rem;
      font-size: 1.125rem;
      gap: 1rem;
    }
    
    @media (min-width: 100rem) {
      padding: 1.25rem 3rem;
      min-height: 3.75rem;
      min-width: 12rem;
      font-size: 1.25rem;
    }
    
    @media (min-width: 30rem) and (max-width: 47.9375rem) {
      flex: 1;
      max-width: 12rem;
    }
    
    &-primary {
      background: var(--gradient);
      color: white;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
      
      @media (min-width: 80rem) {
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
      }
      
      @media (min-width: 100rem) {
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
      }
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.6s ease;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        
        @media (min-width: 80rem) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.45);
        }
        
        @media (min-width: 100rem) {
          transform: translateY(-4px);
          box-shadow: 0 16px 45px rgba(99, 102, 241, 0.5);
        }
        
        &::before {
          left: 100%;
        }
        
        .btn-icon {
          transform: translateX(4px);
        }
      }
      
      @media (hover: none) and (pointer: coarse) {
        &:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
      }
    }
    
    &-glass {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--light);
      position: relative;
      
      @media (min-width: 80rem) {
        backdrop-filter: blur(15px);
        background: rgba(255, 255, 255, 0.06);
      }
      
      .btn-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--gradient);
        border-radius: 100px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .btn-text {
        position: relative;
        z-index: 1;
      }
      
      &:hover {
        transform: translateY(-2px);
        border-color: transparent;
        color: white;
        
        @media (min-width: 80rem) {
          transform: translateY(-3px);
        }
        
        @media (min-width: 100rem) {
          transform: translateY(-4px);
        }
        
        .btn-bg {
          opacity: 1;
        }
      }
      
      @media (hover: none) and (pointer: coarse) {
        &:active {
          transform: translateY(0);
          border-color: rgba(99, 102, 241, 0.3);
          
          .btn-bg {
            opacity: 0.8;
          }
        }
      }
    }
    
    .btn-icon {
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: clamp(1rem, 3vh, 2rem);
    left: 50%;
    transform: translateX(-50%);
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    
    @media (min-width: 48rem) and (min-height: 37.5rem) {
      display: flex;
    }
    
    @media (min-width: 80rem) {
      bottom: 3rem;
      gap: 1rem;
    }
    
    @media (min-width: 100rem) {
      bottom: 4rem;
    }
    
    span {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--gray);
      
      @media (min-width: 80rem) {
        font-size: 0.875rem;
      }
    }
    
    .scroll-mouse {
      width: 24px;
      height: 36px;
      border: 2px solid rgba(99, 102, 241, 0.3);
      border-radius: 12px;
      position: relative;
      
      @media (min-width: 80rem) {
        width: 28px;
        height: 42px;
        border-radius: 14px;
      }
      
      .scroll-wheel {
        width: 4px;
        height: 8px;
        background: var(--primary);
        border-radius: 2px;
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        animation: scroll-wheel 2s ease-in-out infinite;
        
        @media (min-width: 80rem) {
          width: 5px;
          height: 10px;
          top: 10px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          animation: none;
        }
      }
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float-diagonal {
    0%, 100% { 
      transform: translate(0, 0) rotate(0deg); 
    }
    25% { 
      transform: translate(20px, -20px) rotate(5deg); 
    }
    50% { 
      transform: translate(-20px, -30px) rotate(-5deg); 
    }
    75% { 
      transform: translate(-30px, 20px) rotate(3deg); 
    }
  }
  
  @keyframes pulse-ring {
    0% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes scroll-wheel {
    0% { opacity: 0; top: 8px; }
    30% { opacity: 1; }
    60% { opacity: 1; top: 20px; }
    100% { opacity: 0; top: 20px; }
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  // RTL Support
  :global(html[dir="rtl"]) {
    .hero-cta {
      direction: rtl;
    }
    
    .btn svg {
      transform: rotate(180deg);
    }
    
    .badge-float {
      &.badge-1 {
        left: auto;
        right: -15%;
      }
      
      &.badge-2 {
        right: auto;
        left: -15%;
      }
      
      &.badge-3 {
        left: auto;
        right: 5%;
      }
    }
  }
  
  @media print {
    .hero {
      padding: 2rem 0;
      min-height: auto;
      
      &-visual,
      &-grid-pattern,
      .scroll-indicator {
        display: none;
      }
      
      &-badge,
      &-cta {
        display: none;
      }
      
      .container {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  }
</style>