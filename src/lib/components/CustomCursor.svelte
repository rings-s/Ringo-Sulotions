<script lang="ts">
    import { onMount } from 'svelte';
    
    let cursor: HTMLDivElement;
    let cursorDot: HTMLDivElement;
    
    onMount(() => {
      const moveCursor = (e: MouseEvent) => {
        if (cursor && cursorDot) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
          cursorDot.style.left = e.clientX + 'px';
          cursorDot.style.top = e.clientY + 'px';
        }
      };
      
      const handleHover = () => cursor?.classList.add('hover');
      const handleLeave = () => cursor?.classList.remove('hover');
      
      document.addEventListener('mousemove', moveCursor);
      
      const links = document.querySelectorAll('a, button');
      links.forEach(link => {
        link.addEventListener('mouseenter', handleHover);
        link.addEventListener('mouseleave', handleLeave);
      });
      
      return () => {
        document.removeEventListener('mousemove', moveCursor);
        links.forEach(link => {
          link.removeEventListener('mouseenter', handleHover);
          link.removeEventListener('mouseleave', handleLeave);
        });
      };
    });
  </script>
  
  <div bind:this={cursor} class="cursor"></div>
  <div bind:this={cursorDot} class="cursor-dot"></div>