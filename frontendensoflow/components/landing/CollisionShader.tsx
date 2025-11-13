"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CollisionShaderProps {
  collisionProgress: number;
  hasCollided: boolean;
}

export function CollisionShader({ collisionProgress, hasCollided }: CollisionShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Shader uniforms for collision effect
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCollisionProgress: { value: collisionProgress },
      uHasCollided: { value: hasCollided ? 1.0 : 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uImpactColor: { value: new THREE.Color("#FFFFFF") },
      uBeamColor: { value: new THREE.Color("#5141FF") },
      uRippleColor: { value: new THREE.Color("#C0A8FF") },
    }),
    [collisionProgress, hasCollided]
  );

  // Vertex shader
  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader for collision effect
  const fragmentShader = `
    uniform float uTime;
    uniform float uCollisionProgress;
    uniform float uHasCollided;
    uniform vec2 uResolution;
    uniform vec3 uImpactColor;
    uniform vec3 uBeamColor;
    uniform vec3 uRippleColor;

    varying vec2 vUv;

    // Simple noise function
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));

      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    // Impact flash at collision center
    float impactFlash(vec2 uv, float progress) {
      vec2 center = vec2(0.5, 0.5);
      float dist = length(uv - center);

      float flash = smoothstep(0.3, 0.0, dist) * (1.0 - progress);
      flash *= 1.0 - smoothstep(0.0, 0.3, progress);

      return flash;
    }

    // Expanding ripple waves
    float ripples(vec2 uv, float progress, float time) {
      vec2 center = vec2(0.5, 0.5);
      float dist = length(uv - center);

      float ripple = 0.0;

      // Primary ripple
      float ripple1 = abs(sin((dist - progress * 0.8) * 15.0)) * 0.5;
      ripple1 *= smoothstep(0.0, 0.1, dist) * (1.0 - smoothstep(0.3, 0.8, progress));

      // Secondary ripple (delayed)
      float ripple2 = abs(sin((dist - progress * 0.6) * 12.0)) * 0.3;
      ripple2 *= smoothstep(0.0, 0.15, dist) * (1.0 - smoothstep(0.4, 0.9, progress));

      // Tertiary ripple (slowest)
      float ripple3 = abs(sin((dist - progress * 0.4) * 8.0)) * 0.2;
      ripple3 *= smoothstep(0.0, 0.2, dist) * (1.0 - smoothstep(0.5, 1.0, progress));

      ripple = ripple1 + ripple2 + ripple3;

      // Add noise for organic feel
      ripple *= 1.0 + noise(uv * 20.0 + time * 0.5) * 0.2;

      return ripple;
    }

    // Splash dispersal effect
    float splash(vec2 uv, float progress) {
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = uv - center;
      float angle = atan(toCenter.y, toCenter.x);
      float dist = length(toCenter);

      // Create radial splash pattern
      float splashPattern = abs(sin(angle * 8.0 + progress * 10.0)) * 0.5 + 0.5;
      float splashRadius = progress * 0.5;

      float splash = smoothstep(splashRadius - 0.1, splashRadius, dist) *
                     smoothstep(splashRadius + 0.2, splashRadius, dist);

      splash *= splashPattern;
      splash *= 1.0 - progress;

      return splash;
    }

    // Refraction distortion
    vec2 refraction(vec2 uv, float progress, float time) {
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = uv - center;
      float dist = length(toCenter);

      float distortionStrength = 0.03 * (1.0 - progress) * smoothstep(0.0, 0.3, progress);
      float distortion = sin(dist * 20.0 - time * 5.0) * distortionStrength;

      vec2 distortedUv = uv + normalize(toCenter) * distortion;

      return distortedUv;
    }

    void main() {
      vec2 uv = vUv;

      // Apply refraction distortion
      vec2 distortedUv = refraction(uv, uCollisionProgress, uTime);

      // Calculate collision effects
      float flash = impactFlash(distortedUv, uCollisionProgress);
      float rippleEffect = ripples(distortedUv, uCollisionProgress, uTime);
      float splashEffect = splash(distortedUv, uCollisionProgress);

      // Compose colors
      vec3 flashColor = uImpactColor * flash * 2.0;
      vec3 rippleColors = mix(uBeamColor, uRippleColor, rippleEffect) * rippleEffect;
      vec3 splashColors = uBeamColor * splashEffect;

      vec3 finalColor = flashColor + rippleColors + splashColors;

      // Calculate alpha
      float alpha = (flash + rippleEffect * 0.8 + splashEffect * 0.6) * uHasCollided;

      // Fade out as progress increases
      alpha *= 1.0 - smoothstep(0.7, 1.0, uCollisionProgress);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  // Explosion particles
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 60;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.1 + Math.random() * 0.2;

      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      velocities[i * 3 + 0] = Math.cos(angle) * radius;
      velocities[i * 3 + 1] = Math.sin(angle) * radius + Math.random() * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    return geometry;
  }, []);

  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color("#5141FF"),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Animate collision effect
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uCollisionProgress.value = collisionProgress;
      material.uniforms.uHasCollided.value = hasCollided ? 1.0 : 0.0;
    }

    // Animate explosion particles
    if (particlesRef.current && hasCollided) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * collisionProgress * 0.05;
        positions[i + 1] += velocities[i + 1] * collisionProgress * 0.05;
        positions[i + 2] += velocities[i + 2] * collisionProgress * 0.05;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Fade out particles
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.8 * (1.0 - collisionProgress);
    }
  });

  if (!hasCollided) return null;

  return (
    <group position={[0, 0, 0.5]}>
      {/* Collision ripple shader */}
      <mesh ref={meshRef}>
        <planeGeometry args={[4, 4, 1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Explosion particles */}
      <points
        ref={particlesRef}
        geometry={particleGeometry}
        material={particleMaterial}
      />
    </group>
  );
}
