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
      .fromTo('.hero-stats',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
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
            <span>
              Backend Development
            </span>
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
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 6rem;
    
    @media (max-width: 1024px) {
      padding-top: 5rem;
      min-height: 90vh;
    }
    
    @media (max-width: 640px) {
      padding-top: 4rem;
      min-height: 85vh;
      padding-bottom: 2rem;
    }
    
    @media (max-width: 480px) {
      padding-top: 3rem;
      padding-bottom: 1rem;
      min-height: 80vh;
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
      background-size: 50px 50px;
      pointer-events: none;
    }
    
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      z-index: 2;
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      
      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
        padding: 0 1.5rem;
      }
      
      @media (max-width: 768px) {
        padding: 0 1rem;
        gap: 2rem;
      }
    }
    
    &-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 100px;
      color: var(--primary);
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 2rem;
      position: relative;
      
      @media (max-width: 640px) {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
        gap: 0.5rem;
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
      }
    }
    
    &-title {
      margin-bottom: 2rem;
      
      @media (max-width: 640px) {
        margin-bottom: 1.5rem;
      }
      
      @media (max-width: 480px) {
        margin-bottom: 1rem;
      }
      
      .title-line {
        overflow: hidden;
        
        @media (max-width: 480px) {
          line-height: 1.1;
        }
        
        .title-word {
          display: inline-block;
          font-size: clamp(1.8rem, 8vw, 7rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          
          @media (max-width: 640px) {
            font-size: clamp(1.5rem, 10vw, 4rem);
          }
          
          @media (max-width: 480px) {
            font-size: clamp(1.25rem, 12vw, 3rem);
            letter-spacing: -0.01em;
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
      font-size: clamp(1rem, 2.5vw, 1.375rem);
      margin-bottom: 3rem;
      max-width: 600px;
      line-height: 1.7;
      color: var(--gray);
      
      @media (max-width: 1024px) {
        margin: 0 auto 3rem;
      }
      
      @media (max-width: 640px) {
        margin-bottom: 2rem;
        font-size: clamp(0.9rem, 3vw, 1.125rem);
        line-height: 1.6;
        max-width: 500px;
      }
      
      @media (max-width: 480px) {
        margin-bottom: 1.5rem;
        font-size: clamp(0.85rem, 4vw, 1rem);
        line-height: 1.5;
        max-width: 400px;
        padding: 0 0.5rem;
      }
    }
    
    &-cta {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 3rem;
      
      @media (max-width: 1024px) {
        justify-content: center;
      }
      
      @media (max-width: 640px) {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      @media (max-width: 480px) {
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }
    }
    
    &-stats {
      display: inline-flex;
      align-items: center;
      gap: 2.5rem;
      padding: 1.5rem 2.5rem;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(10px);
      border-radius: 100px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      
      @media (max-width: 1024px) {
        margin: 0 auto;
      }
      
      @media (max-width: 640px) {
        gap: 1.5rem;
        padding: 1rem 1.5rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      @media (max-width: 480px) {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        text-align: center;
      }
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        
        @media (max-width: 480px) {
          min-width: auto;
        }
        
        .stat-number {
          font-size: 1.75rem;
          font-weight: 900;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          
          @media (max-width: 640px) {
            font-size: 1.5rem;
          }
          
          @media (max-width: 480px) {
            font-size: 1.25rem;
          }
          
          &::after {
            content: '+';
          }
        }
        
        .stat-label {
          font-size: 0.75rem;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          
          @media (max-width: 640px) {
            font-size: 0.65rem;
          }
        }
      }
      
      .stat-divider {
        width: 1px;
        height: 30px;
        background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
        
        @media (max-width: 640px) {
          height: 20px;
        }
        
        @media (max-width: 480px) {
          width: 30px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
        }
      }
    }
    
    &-visual {
      position: relative;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      @media (max-width: 1024px) {
        display: none;
      }
      
      &-content {
        position: relative;
        width: 100%;
        height: 100%;
      }
      
      .hero-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 50px rgba(99, 102, 241, 0.2));
      }
      
      .floating-badges {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        
        .badge-float {
          position: absolute;
          padding: 0.5rem 1rem;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
          
          &.badge-1 {
            top: 20%;
            left: -10%;
            animation: float-diagonal 8s ease-in-out infinite;
          }
          
          &.badge-2 {
            top: 60%;
            right: -10%;
            animation: float-diagonal 10s ease-in-out infinite reverse;
          }
          
          &.badge-3 {
            bottom: 20%;
            left: 10%;
            animation: float-diagonal 9s ease-in-out infinite;
          }
        }
      }
    }
  }
  
  .btn {
    padding: 1rem 2rem;
    border-radius: 100px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    justify-content: center;
    
    @media (max-width: 640px) {
      padding: 0.875rem 1.5rem;
      font-size: 0.875rem;
      gap: 0.5rem;
      min-height: 48px;
    }
    
    @media (max-width: 480px) {
      padding: 0.75rem 1.25rem;
      font-size: 0.8rem;
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
    }
    
    &-primary {
      background: var(--gradient);
      color: white;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
      
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
        
        &::before {
          left: 100%;
        }
        
        .btn-icon {
          transform: translateX(4px);
        }
      }
    }
    
    &-glass {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--light);
      position: relative;
      
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
        
        .btn-bg {
          opacity: 1;
        }
      }
    }
    
    .btn-icon {
      transition: transform 0.3s ease;
    }
  }
  

  
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    
    @media (max-width: 1024px) {
      bottom: 1.5rem;
    }
    
    @media (max-width: 640px) {
      bottom: 1rem;
      display: none;
    }
    
    span {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--gray);
      
      @media (max-width: 768px) {
        font-size: 0.625rem;
      }
    }
    
    .scroll-mouse {
      width: 24px;
      height: 36px;
      border: 2px solid rgba(99, 102, 241, 0.3);
      border-radius: 12px;
      position: relative;
      
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
  
  :global(html[dir="rtl"]) {
    .hero-cta {
      direction: rtl;
    }
    
    .btn svg {
      transform: rotate(180deg);
    }

  }
</style>