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
    
    // Create geometric network of shapes
    const shapes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    
    // Main Octahedron (Center piece)
    const octaGeometry = new THREE.OctahedronGeometry(2, 0);
    const octaMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366F1,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const mainOcta = new THREE.Mesh(octaGeometry, octaMaterial);
    mainOcta.position.set(3, 0, -10);
    scene.add(mainOcta);
    shapes.push(mainOcta);
    
    // Surrounding Icosahedrons
    const positions = [
      { x: -5, y: 3, z: -12 },
      { x: 7, y: -2, z: -15 },
      { x: -3, y: -4, z: -8 },
      { x: 5, y: 4, z: -13 }
    ];
    
    positions.forEach((pos, index) => {
      const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
      const icoMaterial = new THREE.MeshPhongMaterial({
        color: index % 2 === 0 ? 0x3B82F6 : 0x10B981,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const ico = new THREE.Mesh(icoGeometry, icoMaterial);
      ico.position.set(pos.x, pos.y, pos.z);
      scene.add(ico);
      shapes.push(ico);
      
      // Create connecting lines
      const points = [];
      points.push(mainOcta.position);
      points.push(ico.position);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x6366F1,
        transparent: true,
        opacity: 0.1
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      connections.push(line);
    });
    
    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x6366F1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x6366F1, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x3B82F6, 0.5);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 * (index + 1);
        shape.rotation.y += 0.002 * (index + 1);
        shape.rotation.z += 0.001 * (index % 2 === 0 ? 1 : -1);
        
        // Smooth mouse follow
        shape.position.x += (targetX * (index + 1) - shape.position.x * 0.001) * 0.1;
        shape.position.y += (targetY * (index + 1) - shape.position.y * 0.001) * 0.1;
      });
      
      // Rotate particles
      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0002;
      
      // Pulse connections
      connections.forEach((line, index) => {
        line.material.opacity = 0.1 + Math.sin(Date.now() * 0.001 + index) * 0.05;
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
        x: `+=${Math.random() * 1 - 0.5}`,
        duration: 4 + index,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });
      
      gsap.to(shape.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 2 + index * 0.5,
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