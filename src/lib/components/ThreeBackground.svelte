<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { gsap } from 'gsap';
    
    let canvas: HTMLCanvasElement;
    
    onMount(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      
      // Create floating geometric shapes
      const shapes: THREE.Mesh[] = [];
      
      // Torus Knot
      const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366F1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(-3, 2, -5);
      scene.add(torus);
      shapes.push(torus);
      
      // Icosahedron
      const icoGeometry = new THREE.IcosahedronGeometry(1.5, 1);
      const icoMaterial = new THREE.MeshPhongMaterial({
        color: 0xF97316,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const ico = new THREE.Mesh(icoGeometry, icoMaterial);
      ico.position.set(4, -1, -8);
      scene.add(ico);
      shapes.push(ico);
      
      // Octahedron
      const octaGeometry = new THREE.OctahedronGeometry(1.2, 0);
      const octaMaterial = new THREE.MeshPhongMaterial({
        color: 0x764ba2,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const octa = new THREE.Mesh(octaGeometry, octaMaterial);
      octa.position.set(0, 0, -6);
      scene.add(octa);
      shapes.push(octa);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);
      
      camera.position.z = 5;
      
      // Mouse movement effect
      let mouseX = 0;
      let mouseY = 0;
      
      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        shapes.forEach((shape, index) => {
          shape.rotation.x += 0.001 * (index + 1);
          shape.rotation.y += 0.002 * (index + 1);
          
          // React to mouse
          shape.position.x += mouseX * 0.001;
          shape.position.y -= mouseY * 0.001;
        });
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // GSAP animations for shapes
      shapes.forEach((shape, index) => {
        gsap.to(shape.position, {
          y: `+=${Math.random() * 2 - 1}`,
          duration: 3 + index,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        });
      });
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    });
  </script>
  
  <canvas bind:this={canvas} class="three-canvas"></canvas>
  
  <style>
    .three-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.7;
    }
  </style>