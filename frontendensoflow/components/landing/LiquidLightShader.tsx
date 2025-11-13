"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidLightShaderProps {
  variant?: "hero" | "features" | "pre-collision" | "post-collision";
  opacity?: number;
  scrollProgress?: number;
}

export function LiquidLightShader({
  variant = "hero",
  opacity = 1,
  scrollProgress = 0
}: LiquidLightShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uScrollProgress: { value: scrollProgress },
      uVariant: { value: variant === "hero" ? 0 : variant === "features" ? 1 : variant === "pre-collision" ? 2 : 3 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uBeamWidth: { value: 0.08 }, // 8% of screen width ≈ 100px on desktop
      uFlowSpeed: { value: 0.15 },
      uViscosity: { value: 0.6 },
      uTurbulence: { value: 0.4 },
      uGlowIntensity: { value: 1.2 },
      uCoreColor: { value: new THREE.Color("#FFFFFF") },
      uBeamColor: { value: new THREE.Color("#5141FF") },
      uGlowColor: { value: new THREE.Color("#C0A8FF") },
    }),
    [opacity, scrollProgress, variant]
  );

  // Vertex shader - simple passthrough with UV coordinates
  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader - the magic happens here
  const fragmentShader = `
    uniform float uTime;
    uniform float uOpacity;
    uniform float uScrollProgress;
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

    varying vec2 vUv;

    // Simplex noise implementation for organic fluid motion
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

    // Fractional Brownian Motion for layered turbulence
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;

      for(int i = 0; i < 5; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    // Smooth radial gradient for beam core
    float radialBeam(vec2 uv, float width) {
      float dist = abs(uv.x - 0.5) / width;
      return 1.0 - smoothstep(0.0, 1.0, dist);
    }

    // Liquid flow distortion
    vec2 liquidDistortion(vec2 uv, float time) {
      // Vertical flow with varying speed (simulates viscosity)
      float flowY = time * uFlowSpeed;

      // Horizontal wobble (turbulence)
      float wobbleFreq = 2.0 + uTurbulence * 3.0;
      float wobbleAmp = uTurbulence * 0.015;
      float wobble = snoise(vec2(uv.y * wobbleFreq - flowY * 0.8, time * 0.3)) * wobbleAmp;

      // Organic flow noise (simulates fluid convection)
      float flowNoise = fbm(vec2(uv.y * 3.0 - flowY, uv.x * 8.0 + time * 0.2)) * 0.02 * uViscosity;

      return vec2(uv.x + wobble + flowNoise, uv.y);
    }

    // Internal particle system (glowing orbs floating in the beam)
    float particles(vec2 uv, float time) {
      float particleEffect = 0.0;

      for(float i = 0.0; i < 5.0; i++) {
        float seed = i * 12.345;
        float speed = 0.1 + fract(seed * 0.1) * 0.15;
        float offset = fract(seed * 0.2);
        float wobble = sin(time * 0.5 + seed) * 0.02;

        vec2 particlePos = vec2(
          0.5 + wobble + snoise(vec2(i * 10.0, time * 0.2)) * 0.015,
          fract((time * speed + offset) * 0.5) * 1.2 - 0.1
        );

        float dist = length(uv - particlePos);
        float size = 0.008 + fract(seed * 0.3) * 0.005;
        particleEffect += smoothstep(size, 0.0, dist) * (0.3 + fract(seed) * 0.4);
      }

      return particleEffect;
    }

    void main() {
      // Apply liquid distortion to UV coordinates
      vec2 distortedUv = liquidDistortion(vUv, uTime);

      // Create radial beam shape
      float beamMask = radialBeam(distortedUv, uBeamWidth);

      // Add flowing turbulence
      float turbulenceFlow = fbm(vec2(distortedUv.x * 5.0, distortedUv.y * 2.0 - uTime * uFlowSpeed * 2.0));
      turbulenceFlow = turbulenceFlow * 0.5 + 0.5; // Normalize to 0-1

      // Core beam intensity (bright center)
      float coreIntensity = pow(beamMask, 2.5) * (0.7 + turbulenceFlow * 0.3);

      // Mid beam (main color)
      float midIntensity = pow(beamMask, 1.5) * (0.6 + turbulenceFlow * 0.4);

      // Outer glow (soft diffusion)
      float glowIntensity = pow(beamMask, 0.8) * uGlowIntensity;

      // Vertical gradient (top to bottom fade)
      float verticalGradient = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.6, vUv.y);

      // Add internal particles
      float particleGlow = particles(distortedUv, uTime) * beamMask;

      // Compose colors
      vec3 coreLayer = uCoreColor * coreIntensity;
      vec3 beamLayer = uBeamColor * midIntensity;
      vec3 glowLayer = uGlowColor * glowIntensity * 0.5;
      vec3 particleLayer = uCoreColor * particleGlow * 1.5;

      // Combine all layers
      vec3 finalColor = coreLayer + beamLayer + glowLayer + particleLayer;

      // Apply vertical gradient and variant adjustments
      float variantOpacity = 1.0;
      if(uVariant == 1.0) { // features
        variantOpacity = 0.3;
      } else if(uVariant == 2.0) { // pre-collision
        variantOpacity = 0.8 + sin(uTime * 2.0) * 0.2; // Pulsing
      } else if(uVariant == 3.0) { // post-collision
        variantOpacity = 0.2;
      }

      float finalAlpha = beamMask * verticalGradient * uOpacity * variantOpacity;

      // Scroll fade out
      finalAlpha *= 1.0 - uScrollProgress * 0.7;

      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `;

  // Particle geometry for floating orbs
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 30;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.3; // x
      positions[i * 3 + 1] = Math.random() * 8 - 1; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color("#FFFFFF"),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Animate shader uniforms and particles
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uScrollProgress.value = scrollProgress;
    }

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        // Vertical flow
        positions[i + 1] += 0.002 + Math.random() * 0.001;

        // Reset particles that fall off screen
        if (positions[i + 1] > 4) {
          positions[i + 1] = -1;
          positions[i] = (Math.random() - 0.5) * 0.3;
        }

        // Subtle horizontal drift
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.0001;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main liquid light beam shader */}
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

      {/* Floating particle system */}
      <points
        ref={particlesRef}
        geometry={particleGeometry}
        material={particleMaterial}
      />
    </group>
  );
}
