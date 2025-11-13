"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidLightShaderProps {
  variant?: "hero" | "features" | "pre-collision" | "post-collision";
  opacity?: number;
  scrollProgress?: number;
  scrollVelocity?: number;
}

export function LiquidLightShader({
  variant = "hero",
  opacity = 1,
  scrollProgress = 0,
  scrollVelocity = 0
}: LiquidLightShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uScrollProgress: { value: scrollProgress },
      uScrollVelocity: { value: scrollVelocity },
      uVariant: { value: variant === "hero" ? 0 : variant === "features" ? 1 : variant === "pre-collision" ? 2 : 3 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uBeamWidth: { value: 0.12 },
      uFlowSpeed: { value: 0.8 },
      uViscosity: { value: 0.4 },
      uTurbulence: { value: 0.3 },
      uGlowIntensity: { value: 1.4 },
      uCoreColor: { value: new THREE.Color("#FFFFFF") },
      uBeamColor: { value: new THREE.Color("#5141FF") },
      uGlowColor: { value: new THREE.Color("#C0A8FF") },
      uGravity: { value: 0.5 },
    }),
    [opacity, scrollProgress, scrollVelocity, variant]
  );

  // Vertex shader - simple passthrough with UV coordinates
  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader - continuous beam with scroll speed effect
  const fragmentShader = `
    uniform float uTime;
    uniform float uOpacity;
    uniform float uScrollProgress;
    uniform float uScrollVelocity;
    uniform float uVariant;
    uniform vec2 uResolution;
    uniform float uBeamWidth;
    uniform float uFlowSpeed;
    uniform float uViscosity;
    uniform float uTurbulence;
    uniform float uGlowIntensity;
    uniform vec3 uCoreColor;
    uniform vec3 uBeamColor;
    uniform vec3 uGlowColor;
    uniform float uGravity;

    varying vec2 vUv;

    // Simplex noise implementation
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // Simulate falling particle - continuous flow
    vec2 simulateParticle(vec2 startPos, float timeOffset, float particleId) {
      // Speed multiplier based on scroll velocity (1x to 5x speed)
      float speedMultiplier = 1.0 + uScrollVelocity * 8.0;

      float t = mod(uTime * uFlowSpeed * speedMultiplier + timeOffset, 6.0);

      // Initial position at top
      vec2 pos = startPos;
      pos.y = -0.1 + t * 0.18; // Falling with constant velocity

      // Add gravity acceleration
      float gravity = uGravity * t * t * 0.015 * speedMultiplier;
      pos.y += gravity;

      // Horizontal wobble (natural turbulence)
      float wobble = snoise(vec2(particleId * 10.0, uTime * speedMultiplier * 0.5 + timeOffset)) * 0.02;
      pos.x += wobble;

      return pos;
    }

    // Draw particle glow
    float drawParticle(vec2 uv, vec2 particlePos, float size, float intensity) {
      float dist = length(uv - particlePos);
      float particle = smoothstep(size, 0.0, dist) * intensity;
      float glow = smoothstep(size * 4.0, 0.0, dist) * intensity * 0.3;
      return particle + glow;
    }

    // Main beam shape - continuous flow
    float liquidBeam(vec2 uv) {
      float beamIntensity = 0.0;
      float speedMultiplier = 1.0 + uScrollVelocity * 8.0;

      // Multiple particle streams
      for(float i = 0.0; i < 30.0; i++) {
        float particleId = i / 30.0;
        float offset = particleId * 3.0;

        // Start position (top of screen, centered)
        vec2 startPos = vec2(
          0.5 + (particleId - 0.5) * 0.15, // Spread across beam width
          -0.1
        );

        vec2 particlePos = simulateParticle(startPos, offset, particleId);

        // Only draw if on screen
        if (particlePos.y < 1.2 && particlePos.y > -0.1) {
          float size = 0.01 + sin(i * 10.0) * 0.004;
          float intensity = 0.8 + sin(uTime * speedMultiplier + i) * 0.2;
          beamIntensity += drawParticle(uv, particlePos, size, intensity);
        }
      }

      // Add continuous beam core
      float distFromCenter = abs(uv.x - 0.5);
      float beamMask = smoothstep(uBeamWidth, 0.0, distFromCenter);
      beamIntensity += beamMask * 0.6;

      // Add flowing noise with scroll speed
      float flowNoise = snoise(vec2(uv.x * 10.0, uv.y * 5.0 - uTime * 2.0 * speedMultiplier)) * 0.5 + 0.5;
      beamIntensity += beamMask * flowNoise * 0.3;

      return beamIntensity;
    }

    void main() {
      vec2 uv = vUv;

      // Calculate beam intensity with scroll speed effect
      float beamMask = liquidBeam(uv);

      // Apply colors
      float coreIntensity = pow(beamMask, 2.0);
      float midIntensity = pow(beamMask, 1.2);
      float glowIntensity = pow(beamMask, 0.6) * uGlowIntensity;

      vec3 coreLayer = uCoreColor * coreIntensity;
      vec3 beamLayer = uBeamColor * midIntensity * 1.5;
      vec3 glowLayer = uGlowColor * glowIntensity * 0.7;

      vec3 finalColor = coreLayer + beamLayer + glowLayer;

      // Variant opacity
      float variantOpacity = 1.0;
      if(uVariant == 1.0) { // features - very subtle
        variantOpacity = 0.08;
      } else if(uVariant == 2.0) { // pre-collision
        variantOpacity = 0.8 + sin(uTime * 2.0) * 0.2;
      } else if(uVariant == 3.0) { // post-collision
        variantOpacity = 0.15;
      }

      float finalAlpha = beamMask * uOpacity * variantOpacity;

      // Scroll fade (but maintain visibility)
      finalAlpha *= 1.0 - uScrollProgress * 0.5;

      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `;

  // Enhanced particle system - continuous flow
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 150; // More particles for better effect
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const ages = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Start at top, centered around beam
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 3 + Math.random() * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = -0.03 - Math.random() * 0.02; // Downward velocity
      velocities[i * 3 + 2] = 0;

      ages[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('age', new THREE.BufferAttribute(ages, 1));

    return geometry;
  }, []);

  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color("#FFFFFF"),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Animate shader uniforms and particles with scroll speed effect
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uScrollProgress.value = scrollProgress;
      material.uniforms.uScrollVelocity.value = scrollVelocity;
    }

    // Animate particles with gravity - continuous flow
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;
      const ages = particlesRef.current.geometry.attributes.age.array as Float32Array;

      // Speed multiplier based on scroll velocity
      const speedMultiplier = 1.0 + scrollVelocity * 3.0;

      for (let i = 0; i < positions.length; i += 3) {
        const idx = i / 3;

        // Apply gravity with scroll speed
        velocities[i + 1] -= 0.0012 * speedMultiplier;

        // Update position
        positions[i] += velocities[i] * speedMultiplier;
        positions[i + 1] += velocities[i + 1] * speedMultiplier;
        positions[i + 2] += velocities[i + 2];

        // Add slight horizontal wobble
        positions[i] += Math.sin(state.clock.elapsedTime * 2 + idx) * 0.001;

        // Reset particles that fall off screen
        if (positions[i + 1] < -5) {
          positions[i + 1] = 3 + Math.random() * 3;
          positions[i] = (Math.random() - 0.5) * 0.4;
          velocities[i] = (Math.random() - 0.5) * 0.015;
          velocities[i + 1] = -0.03 - Math.random() * 0.02;
          ages[idx] = 0;
        }

        // Age particles
        ages[idx] += 0.01 * speedMultiplier;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.velocity.needsUpdate = true;
      particlesRef.current.geometry.attributes.age.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main liquid light beam shader with scroll speed effect */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[2, 8, 1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating particle system - continuous flow */}
      <points
        ref={particlesRef}
        geometry={particleGeometry}
        material={particleMaterial}
      />
    </group>
  );
}
