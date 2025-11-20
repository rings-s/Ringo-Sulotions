<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
  {@render children()}
</div>
