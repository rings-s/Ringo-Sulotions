<script lang="ts">
	import { _ } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import emailjs from '@emailjs/browser';
    import { gsap } from 'gsap';
    
    onMount(() => {
      // Initialize EmailJS with your public key
      // Initialize EmailJS with your public key from environment variables
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      
      gsap.fromTo('.contact-content > *',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
      );
    });
  </script>
  
  <section class="contact">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <h1>{@html $_('contact.title')}</h1>
          <p>{$_('contact.subtitle')}</p>
          
          <div class="contact-details">
            <div class="contact-item">
              <h3>📱 {$_('contact.phone')}</h3>
              <a href="tel:+966507441209">+966 507 441 209</a>
            </div>
            
            <div class="contact-item">
              <h3>📧 {$_('contact.email')}</h3>
              <a href="mailto:junni9619@gmail.com">junni9619@gmail.com</a>
            </div>
            
            <div class="contact-item">
              <h3>📍 {$_('contact.location')}</h3>
              <p>{$_('contact.location_text')}</p>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <form name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <div class="form-group">
              <input 
                type="text" 
                
                placeholder={$_('contact.form_name')}
                required
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <input 
                type="email" 
                
                placeholder={$_('contact.form_email')}
                required
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <textarea 
                
                placeholder={$_('contact.form_message')}
                rows="6"
                required
                class="form-input"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="btn-submit"
            >
              {$_('contact.form_submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  
  <style lang="scss">
    .contact {
      min-height: 100vh;
      padding: 8rem 2rem 4rem;
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      &-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: start;
        
        @media (max-width: 968px) {
          grid-template-columns: 1fr;
        }
      }
      
      &-info {
        h1 {
          margin-bottom: 1.5rem;
          
          .gradient-text {
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }
        
        > p {
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }
      }
      
      &-details {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      
      &-item {
        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }
        
        a {
          color: var(--light);
          text-decoration: none;
          font-size: 1.1rem;
          transition: color 0.3s ease;
          
          &:hover {
            color: var(--primary);
          }
        }
        
        p {
          font-size: 1.1rem;
        }
      }
      
      &-form {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 2.5rem;
      }
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-input {
      width: 100%;
      padding: 1rem 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: var(--light);
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: var(--primary);
        background: rgba(255, 255, 255, 0.08);
      }
      
      &::placeholder {
        color: var(--gray);
      }
    }
    
    textarea.form-input {
      resize: vertical;
      font-family: inherit;
    }
    
    .btn-submit {
      width: 100%;
      padding: 1.2rem;
      background: var(--gradient);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  </style>