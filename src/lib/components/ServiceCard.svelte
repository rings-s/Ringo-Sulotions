<script lang="ts">
    export let service: {
      title: string;
      description: string;
      icon: string;
    };
  </script>
  
  <div class="service-card">
    <div class="icon">{service.icon}</div>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
  </div>
  
  <style lang="scss">
    .service-card {
      padding: 2rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--primary);
      }
      
      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.3rem;
      }
      
      p {
        font-size: 0.95rem;
        line-height: 1.6;
      }
    }
  </style>