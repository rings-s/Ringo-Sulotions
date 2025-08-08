<script lang="ts">
    import { onMount } from 'svelte';
    import { _, locale } from 'svelte-i18n';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import ThreeBackground from '$lib/components/ThreeBackground.svelte';
    import CustomCursor from '$lib/components/CustomCursor.svelte';
    import ServiceCard from '$lib/components/ServiceCard.svelte';
    
    gsap.registerPlugin(ScrollTrigger);
    
    onMount(() => {
      // Hero animations
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.hero-title span',
        { opacity: 0, y: 100, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero-description',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.3'
      );
      
      // Scroll animations
      gsap.utils.toArray('.section').forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });
    
        let services = [];

    $: {
        $locale;
        services = [
          {
            title: $_('home.services.static.title'),
            description: $_('home.services.static.description'),
            icon: '⚡'
          },
          {
            title: $_('home.services.webapp.title'),
            description: $_('home.services.webapp.description'),
            icon: '🚀'
          },
          {
            title: $_('home.services.saas.title'),
            description: $_('home.services.saas.description'),
            icon: '☁️'
          },
          {
            title: $_('home.services.api.title'),
            description: $_('home.services.api.description'),
            icon: '🔌'
          }
        ];
    }
  </script>
  
  <ThreeBackground />
  <CustomCursor />
  
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <p class="hero-subtitle">{$_('home.subtitle')}</p>
        <h1 class="hero-title">
          <span>{$_('home.title_part1')}</span>
          <span class="gradient-text">{$_('home.title_part2')}</span>
        </h1>
        <p class="hero-description">
          {@html $_('home.description')}
        </p>
        <div class="hero-cta">
          <a href="/contact" class="btn btn-primary">
            {$_('home.cta_project')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/services" class="btn btn-outline">{$_('home.cta_services')}</a>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="floating-card">
          <div class="card-content">
            <span class="card-number">{$_('home.experience_number')}</span>
            <span class="card-label">{$_('home.experience_label')}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator">
      <span>{$_('home.scroll')}</span>
      <div class="scroll-line"></div>
    </div>
  </section>
  
  <section class="services-preview section">
    <div class="container">
      <h2>{$_('home.what_we_do')}</h2>
      <div class="services-grid">
        {#each services as service}
          <ServiceCard {service} />
        {/each}
      </div>
    </div>
  </section>
  
  <style lang="scss">
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      position: relative;
      overflow: hidden;
      
      &-container {
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
        
        @media (max-width: 968px) {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
      
      &-content {
        z-index: 2;
      }
      
      &-subtitle {
        color: var(--primary);
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      
      &-title {
        margin-bottom: 2rem;
        perspective: 1000px;
        
        span {
          display: inline-block;
          margin-right: 1rem;
        }
        
        .gradient-text {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
      
      &-description {
        font-size: 1.3rem;
        margin-bottom: 3rem;
        max-width: 600px;
        
        @media (max-width: 968px) {
          margin: 0 auto 3rem;
        }
      }
      
      &-cta {
        display: flex;
        gap: 1.5rem;
        
        @media (max-width: 968px) {
          justify-content: center;
          flex-wrap: wrap;
        }
      }
      
      &-visual {
        position: relative;
        height: 500px;
        
        @media (max-width: 968px) {
          display: none;
        }
      }
    }
    
    .btn {
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      
      &-primary {
        background: var(--gradient);
        color: white;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }
      }
      
      &-outline {
        border: 2px solid var(--primary);
        color: var(--primary);
        
        &:hover {
          background: var(--primary);
          color: white;
        }
      }
    }
    
    .floating-card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 2rem;
      animation: float 6s ease-in-out infinite;
      
      .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      
      .card-number {
        font-size: 3rem;
        font-weight: 900;
        background: var(--gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .card-label {
        color: var(--gray);
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
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
      gap: 0.5rem;
      
      span {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: var(--gray);
      }
      
      .scroll-line {
        width: 1px;
        height: 50px;
        background: linear-gradient(to bottom, var(--primary), transparent);
        animation: pulse 2s ease-in-out infinite;
      }
    }
    
    .services-preview {
      padding: 5rem 2rem;
      
      .container {
        max-width: 1400px;
        margin: 0 auto;
      }
      
      h2 {
        margin-bottom: 3rem;
      }
      
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }
    }
  </style>