import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Actual particle points ───────────────────────────────────────────────────
function Particles({ mouse }) {
  const meshRef = useRef()
  const COUNT = 3000

  // Build sphere positions + random offsets for "breathing"
  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const phases = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere distribution for uniform density
      const theta = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
      const phi = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 2.2 + (Math.random() - 0.5) * 0.4
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi)
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi)
      positions[i * 3 + 2] = r * Math.cos(theta)
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, phases }
  }, [])

  const posRef = useRef(new Float32Array(positions))

  // Animate: rotate + breathe + mouse tilt
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    // Breathing: pulse sphere radius slightly
    for (let i = 0; i < COUNT; i++) {
      const phase = phases[i]
      const breathe = 1 + Math.sin(t * 0.7 + phase) * 0.06
      posRef.current[i * 3] = positions[i * 3] * breathe
      posRef.current[i * 3 + 1] = positions[i * 3 + 1] * breathe
      posRef.current[i * 3 + 2] = positions[i * 3 + 2] * breathe
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true

    // Slow auto-rotation
    meshRef.current.rotation.y = t * 0.12
    meshRef.current.rotation.x = t * 0.04

    // Mouse tilt
    meshRef.current.rotation.x += (mouse.current.y * 0.4 - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (mouse.current.x * 0.5) * 0.02
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={posRef.current}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#FF8C00"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Inner glow ring ───────────────────────────────────────────────────────────
function GlowRing({ mouse }) {
  const ringRef = useRef()
  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.z = t * 0.18
    ringRef.current.rotation.x = 0.4 + mouse.current.y * 0.3
    ringRef.current.rotation.y = t * 0.06 + mouse.current.x * 0.3
  })
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.008, 16, 200]} />
      <meshBasicMaterial color="#d4a853" transparent opacity={0.35} />
    </mesh>
  )
}

// ── Second ring (orthogonal) ──────────────────────────────────────────────────
function GlowRing2({ mouse }) {
  const ringRef = useRef()
  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.z = -t * 0.1
    ringRef.current.rotation.y = Math.PI / 2 + t * 0.08
    ringRef.current.rotation.x = mouse.current.y * 0.2
  })
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.008, 16, 200]} />
      <meshBasicMaterial color="#FF6B00" transparent opacity={0.25} />
    </mesh>
  )
}

// ── Scene wrapper (tracks mouse in normalised coords) ────────────────────────
function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const { gl } = useThree()

  useEffect(() => {
    const el = gl.domElement.parentElement
    const handler = (e) => {
      const rect = el.getBoundingClientRect()
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * -2
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [gl])

  return (
    <>
      <Particles mouse={mouse} />
      <GlowRing mouse={mouse} />
      <GlowRing2 mouse={mouse} />
    </>
  )
}

// ── Public component ──────────────────────────────────────────────────────────
export default function ParticleSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene />
    </Canvas>
  )
}
