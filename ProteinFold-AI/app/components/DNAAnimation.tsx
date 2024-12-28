'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function BasePair({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const direction = end.clone().sub(start)
  const length = direction.length()
  const center = start.clone().add(end).multiplyScalar(0.5)
  
  // Calculate rotation to point from start to end
  const quaternion = new THREE.Quaternion()
  const up = new THREE.Vector3(0, 1, 0)
  direction.normalize()
  quaternion.setFromUnitVectors(up, direction)

  return (
    <group position={center} quaternion={quaternion}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, length, 8]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, length/2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -length/2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function DNA() {
  const dnaRef = useRef<THREE.Group>(null)
  const numPoints = 100
  const radius = 4
  const height = 20
  const turns = 4

  // Generate helix points
  const points1 = useMemo(() => {
    const points = []
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2 * turns
      const y = (i / numPoints) * height - height / 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      points.push(new THREE.Vector3(x, y, z))
    }
    return points
  }, [])

  const points2 = useMemo(() => {
    const points = []
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2 * turns + Math.PI
      const y = (i / numPoints) * height - height / 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      points.push(new THREE.Vector3(x, y, z))
    }
    return points
  }, [])

  // Create connections between strands
  const connections = useMemo(() => {
    const conn = []
    for (let i = 0; i < numPoints; i += 5) {
      conn.push({
        start: points1[i],
        end: points2[i]
      })
    }
    return conn
  }, [points1, points2])

  useFrame(({ clock }) => {
    if (dnaRef.current) {
      dnaRef.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  const curve1 = useMemo(() => new THREE.CatmullRomCurve3(points1), [points1])
  const curve2 = useMemo(() => new THREE.CatmullRomCurve3(points2), [points2])

  return (
    <group ref={dnaRef}>
      {/* First Helix Strand */}
      <mesh>
        <tubeGeometry args={[curve1, 100, 0.3, 8, false]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Second Helix Strand */}
      <mesh>
        <tubeGeometry args={[curve2, 100, 0.3, 8, false]} />
        <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Base Pairs */}
      {connections.map((conn, i) => (
        <BasePair key={i} start={conn.start} end={conn.end} />
      ))}
    </group>
  )
}

export default function DNAViewer() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
        <color attach="background" args={["#1a1a1a"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <DNA />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

