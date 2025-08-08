<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    
    const services = [
      {
        title: 'Static Websites',
        description: 'Fast, secure, and SEO-optimized static sites built with modern frameworks.',
        features: ['Lightning-fast load times', 'SEO optimization', 'Responsive design', 'CDN deployment'],
        icon: '⚡'
      },
      {
        title: 'Web Applications',
        description: 'Dynamic, interactive web applications that scale with your business.',
        features: ['Custom functionality', 'Real-time updates', 'User authentication', 'Database integration'],
        icon: '🚀'
      },
      {
        title: 'SaaS Solutions',
        description: 'Complete software-as-a-service platforms tailored to your needs.',
        features: ['Subscription management', 'Multi-tenancy', 'Analytics dashboard', 'API integration'],
        icon: '☁️'
      },
      {
        title: 'REST APIs',
        description: 'Robust and secure API development for seamless data exchange.',
        features: ['RESTful architecture', 'Authentication & security', 'Documentation', 'Third-party integration'],
        icon: '🔌'
      }
    ];
    
    onMount(() => {
      gsap.fromTo('.service-card',
        { opacity: 0, y: 50, rotateY: -30 },
        { 
          opacity: 1, 
          y: 0, 
          rotateY: 0,
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
          }
        }
      );
    });
  </script>
  
  <section class="services">
    <div class="container">
      <div class="services-header">
        <h1>Our <span class="gradient-text">Services</span></h1>
        <p>Comprehensive solutions for your digital needs</p>
      </div>
      
      <div class="services-grid">
        {#each services as service, index}
          <div class="service-card" style="--delay: {index * 0.1}s">
            <div class="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul class="service-features">
              {#each service.features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
            <a href="/contact" class="service-cta">Get Started →</a>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <style lang="scss">
    .services {
      min-height: 100vh;
      padding: 8rem 2rem 4rem;
      
      .container {
        max-width: 1400px;
        margin: 0 auto;
      }
      
      &-header {
        text-align: center;
        margin-bottom: 4rem;
        
        h1 {
          margin-bottom: 1rem;
          
          .gradient-text {
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }
        
        p {
          font-size: 1.2rem;
        }
      }
      
      &-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        perspective: 1000px;
      }
    }
    
    .service-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 2.5rem;
      transition: all 0.3s ease;
      transform-style: preserve-3d;
      
      &:hover {
        transform: translateY(-10px);
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--primary);
        box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
      }
      
      .service-icon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
      }
      
      h3 {
        margin-bottom: 1rem;
        color: var(--light);
      }
      
      p {
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }
      
      .service-features {
        list-style: none;
        margin-bottom: 2rem;
        
        li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: var(--gray);
          
          &:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary);
          }
        }
      }
      
      .service-cta {
        color: var(--primary);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateX(5px);
        }
      }
    }
  </style>