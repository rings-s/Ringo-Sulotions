<script>
  import { page } from '$app/stores';
</script>

<div class="error-page">
  <div class="error-content">
    <h1>Something went wrong</h1>
    <p>Status: {$page.status}</p>
    <p>Error: {$page.error?.message}</p>
    <a href="/" class="btn">Go Home</a>
  </div>
</div>

<style>
  .error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0A0A0F;
    color: white;
    text-align: center;
  }
  
  .error-content {
    max-width: 500px;
    padding: 2rem;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #6366F1;
  }
  
  p {
    margin: 0.5rem 0;
    color: #9CA3AF;
  }
  
  .btn {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    background: linear-gradient(90deg, #6366F1, #3B82F6, #10B981);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  
  .btn:hover {
    transform: translateY(-2px);
  }
</style>