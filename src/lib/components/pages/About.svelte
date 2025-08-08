<script lang="ts">
    import { onMount } from 'svelte';
    import { _ } from 'svelte-i18n';
    
    onMount(async () => {
      const { gsap } = await import('gsap');
      gsap.fromTo('.about-content > *',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    });
  </script>
  
  <section class="about">
    <div class="container">
      <div class="about-content">
        <h1 class="page-title">{@html $_('about.title')}</h1>
        
        <div class="about-intro">
          <h2 class="intro-name">{$_('about.intro_name')}</h2>
          <p class="intro-role">{$_('about.intro_role')}</p>
        </div>
        
        <div class="about-story">
          <p>
            {$_('about.story1')}
          </p>
          <p>
            {$_('about.story2')}
          </p>
        </div>
        
        <div class="expertise">
          <h3>{$_('about.expertise_title')}</h3>
          <div class="expertise-grid">
            <div class="expertise-item">
              <span class="number">5+</span>
              <span class="label">{$_('about.experience_label')}</span>
            </div>
            <div class="expertise-item">
              <span class="number">3</span>
              <span class="label">{$_('about.projects_label')}</span>
            </div>
            <div class="expertise-item">
              <span class="number">100%</span>
              <span class="label">{$_('about.satisfaction_label')}</span>
            </div>
          </div>
        </div>
        
        <div class="tech-stack">
          <h3>{$_('about.stack_title')}</h3>
          <div class="tech-icons">
            <div class="tech-item">JavaScript</div>
            <div class="tech-item">Python</div>
            <div class="tech-item">Rest Apis</div>
            <div class="tech-item">Data Visualization</div>
            <div class="tech-item">Data Analysis</div>
            <div class="tech-item">Matrix and Kpis</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <style lang="scss">
    .about {
      min-height: 100vh;
      padding: 8rem 2rem 4rem;
      
      .container {
        max-width: 1000px;
        margin: 0 auto;
      }
      
      h1 {
        margin-bottom: 3rem;
        
        .gradient-text {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
      
      .about-intro {
        margin-bottom: 3rem;
        
        h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .role {
          color: var(--primary);
          font-size: 1.2rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      }
      
      .about-story {
        margin-bottom: 4rem;
        
        p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
      }
      
      .expertise {
        margin-bottom: 4rem;
        
        h3 {
          margin-bottom: 2rem;
        }
        
        &-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }
        
        &-item {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          
          .number {
            display: block;
            font-size: 2.5rem;
            font-weight: 900;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
          }
          
          .label {
            color: var(--gray);
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
        }
      }
      
      .tech-stack {
        h3 {
          margin-bottom: 2rem;
        }
        
        .tech-icons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .tech-item {
          padding: 0.8rem 1.5rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid var(--primary);
          border-radius: 50px;
          color: var(--primary);
          font-weight: 600;
          transition: all 0.3s ease;
          
          &:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-2px);
          }
        }
      }
    }
  </style>