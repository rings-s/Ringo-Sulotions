<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  
  onMount(async () => {
    // GSAP animation remains unchanged
    const { gsap } = await import('gsap');
    gsap.fromTo('.contact-grid > *', // Adjusted selector to target children of the grid
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  });
</script>

<!-- 
  START: NETLIFY FORM FIX
  This hidden form is never displayed to the user. Its purpose is to be detected by Netlify's build bots.
  It must contain the same form name and input fields as your visible form.
-->
<form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>
<!-- END: NETLIFY FORM FIX -->

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
        <!-- 
          This is your visible form. It will now work because Netlify detected the hidden form above.
          The `data-netlify-honeypot` attribute is added for spam protection.
        -->
        <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
          <!-- This hidden input tells Netlify which form is being submitted. It's essential. -->
          <input type="hidden" name="form-name" value="contact" />
          
          <!-- This is a hidden "honeypot" field to catch spam bots. It should not be visible to users. -->
          <div style="display: none;" aria-hidden="true">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </div>

          <div class="form-group">
            <input 
              type="text" 
              name="name"
              placeholder={$_('contact.form_name')}
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <input 
              type="email" 
              name="email"
              placeholder={$_('contact.form_email')}
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <textarea 
              name="message"
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
