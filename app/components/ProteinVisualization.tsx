"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer"
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"
import { Button } from "./ui/Button"

type StructureType = "primary" | "secondary" | "tertiary" | "quaternary" | "alpha" | "beta"

interface AminoAcid {
  position: THREE.Vector3
  type: string
}

const aminoAcidColors: { [key: string]: string } = {
  A: "#FF6B6B",
  R: "#4ECDC4",
  N: "#45B7D1",
  D: "#F9C74F",
  C: "#FF9FF3",
  E: "#43AA8B",
  Q: "#F8961E",
  G: "#90BE6D",
  H: "#577590",
  I: "#277DA1",
  L: "#9C89B8",
  K: "#F94144",
  M: "#F3722C",
  F: "#43AA8B",
  P: "#577590",
  S: "#90BE6D",
  T: "#F9C74F",
  W: "#F8961E",
  Y: "#F94144",
  V: "#4ECDC4",
  B: "#FF9FF3",
  J: "#277DA1",
  O: "#F3722C",
  U: "#9C89B8",
  X: "#577590",
  Z: "#43AA8B",
}

function getAminoAcidColor(type: string): string {
  return aminoAcidColors[type.toUpperCase()] || "#FFFFFF"
}

function createSphereMaterial(color: string) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.2,
    roughness: 0.3,
    emissive: new THREE.Color(color).multiplyScalar(0.2),
    transparent: true,
    opacity: 0.9,
    envMapIntensity: 1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
  })
}

function predictPrimaryStructure(sequence: string): AminoAcid[] {
  return sequence.split("").map((aa, i) => ({
    position: new THREE.Vector3(i * 5 - (sequence.length * 5) / 2, 0, 0),
    type: aa,
  }))
}

function predictSecondaryStructure(sequence: string, type: "alpha" | "beta" = "alpha"): AminoAcid[] {
  if (type === "alpha") {
    const radius = 8
    const heightPerTurn = 5
    const residuesPerTurn = 3.6
    const angleStep = (2 * Math.PI) / residuesPerTurn

    return sequence.split("").map((aa, i) => {
      const angle = angleStep * i
      const height = (i / residuesPerTurn) * heightPerTurn
      return {
        position: new THREE.Vector3(radius * Math.cos(angle), height, radius * Math.sin(angle)),
        type: aa,
      }
    })
  } else {
    const spacing = 4
    const amplitude = 8
    const period = 4

    return sequence.split("").map((aa, i) => ({
      position: new THREE.Vector3(
        i * spacing - (sequence.length * spacing) / 2,
        amplitude * Math.sin((i * Math.PI) / period),
        amplitude * Math.cos((i * Math.PI) / period),
      ),
      type: aa,
    }))
  }
}

function predictTertiaryStructure(sequence: string): AminoAcid[] {
  const radius = 15
  return sequence.split("").map((aa) => {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = radius * Math.cbrt(Math.random())
    return {
      position: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ),
      type: aa,
    }
  })
}

function predictQuaternaryStructure(sequence: string): AminoAcid[] {
  const subunitCount = 4
  const subunitSize = Math.floor(sequence.length / subunitCount)
  const radius = 20

  return Array.from({ length: subunitCount }).flatMap((_, subunit) => {
    const subunitOffset = new THREE.Vector3(
      radius * Math.cos((subunit * Math.PI * 2) / subunitCount),
      0,
      radius * Math.sin((subunit * Math.PI * 2) / subunitCount),
    )

    const subunitSequence = sequence.slice(subunit * subunitSize, (subunit + 1) * subunitSize)
    return predictTertiaryStructure(subunitSequence).map((aa) => ({
      position: aa.position.add(subunitOffset),
      type: aa.type,
    }))
  })
}

export default function ProteinVisualization({ sequence }: { sequence: string }) {
  const [structureType, setStructureType] = useState<StructureType>("primary")
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const labelRendererRef = useRef<CSS2DRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const proteinGroupRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(50, 20, 50)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(width, height)
    labelRenderer.domElement.style.position = "absolute"
    labelRenderer.domElement.style.top = "0"
    labelRenderer.domElement.style.left = "0"
    labelRenderer.domElement.style.pointerEvents = "none"
    container.appendChild(labelRenderer.domElement)
    labelRendererRef.current = labelRenderer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxDistance = 200
    controls.minDistance = 30
    controlsRef.current = controls

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xffffff, 5)
    pointLight1.position.set(50, 50, 50)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xffffff, 5)
    pointLight2.position.set(-50, -50, -50)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xffffff, 5)
    pointLight3.position.set(0, 50, 0)
    scene.add(pointLight3)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(0, 1, 0)
    scene.add(directionalLight)

    function animate() {
      requestAnimationFrame(animate)
      if (proteinGroupRef.current) {
        proteinGroupRef.current.rotation.y += 0.002
        proteinGroupRef.current.children.forEach((child) => {
          if (child instanceof CSS2DObject && (child as any).update) {
            ;(child as any).update()
          }
        })
      }
      controls.update()
      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
    }
    animate()

    return () => {
      renderer.dispose()
      container.removeChild(renderer.domElement)
      container.removeChild(labelRenderer.domElement)
    }
  }, [])

  useEffect(() => {
    if (!sceneRef.current) return

    if (proteinGroupRef.current) {
      proteinGroupRef.current.children.forEach((child) => {
        if (child instanceof CSS2DObject) {
          child.element.remove()
          child.removeFromParent()
        }
      })
      sceneRef.current.remove(proteinGroupRef.current)
    }

    const proteinGroup = new THREE.Group()

    let aminoAcids: AminoAcid[]
    switch (structureType) {
      case "primary":
        aminoAcids = predictPrimaryStructure(sequence)
        break
      case "alpha":
        aminoAcids = predictSecondaryStructure(sequence, "alpha")
        break
      case "beta":
        aminoAcids = predictSecondaryStructure(sequence, "beta")
        break
      case "tertiary":
        aminoAcids = predictTertiaryStructure(sequence)
        break
      case "quaternary":
        aminoAcids = predictQuaternaryStructure(sequence)
        break
      default:
        aminoAcids = predictPrimaryStructure(sequence)
    }

    const validPositions = aminoAcids
      .map((aa) => aa.position)
      .filter((pos) => pos && pos.x !== undefined && pos.y !== undefined && pos.z !== undefined)
    const backboneCurve = new THREE.CatmullRomCurve3(validPositions)

    if (validPositions.length > 1) {
      const backboneGeometry = new THREE.TubeGeometry(backboneCurve, validPositions.length * 2, 0.8, 12, false)
      const backboneMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
      })
      const backbone = new THREE.Mesh(backboneGeometry, backboneMaterial)
      proteinGroup.add(backbone)
    }

    aminoAcids.forEach((aa, index) => {
      if (!aa.position || aa.position.x === undefined || aa.position.y === undefined || aa.position.z === undefined) {
        console.warn(`Invalid position for amino acid at index ${index}`)
        return
      }

      const sphereGeometry = new THREE.SphereGeometry(2.5, 32, 32)
      const color = getAminoAcidColor(aa.type)
      const sphereMaterial = createSphereMaterial(color)
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.copy(aa.position)

      const labelElement = document.createElement("div")
      labelElement.className = "select-none pointer-events-none"
      labelElement.style.color = color
      labelElement.style.fontSize = "16px"
      labelElement.style.fontFamily = "'Inter', sans-serif"
      labelElement.style.fontWeight = "600"
      labelElement.style.textShadow = "0 2px 4px rgba(0,0,0,0.8)"
      labelElement.style.display = "flex"
      labelElement.style.justifyContent = "center"
      labelElement.style.alignItems = "center"
      labelElement.textContent = aa.type.toUpperCase()

      const label = new CSS2DObject(labelElement)
      label.position.copy(sphere.position)

      const updateLabel = () => {
        if (!cameraRef.current) return
        const distance = cameraRef.current.position.distanceTo(sphere.position)
        const scale = Math.max(distance / 50, 0.5)
        labelElement.style.transform = `scale(${scale})`
      }
      ;(label as any).update = updateLabel

      proteinGroup.add(sphere)
      proteinGroup.add(label)
    })

    sceneRef.current.add(proteinGroup)
    proteinGroupRef.current = proteinGroup

    const box = new THREE.Box3().setFromObject(proteinGroup)
    const center = box.getCenter(new THREE.Vector3())
    proteinGroup.position.sub(center)
    if (cameraRef.current) {
      cameraRef.current.lookAt(proteinGroup.position)
    }
  }, [sequence, structureType])

  const exportModel = () => {
    if (!sceneRef.current || !proteinGroupRef.current) return

    // Clone the protein group to modify for export
    const exportGroup = proteinGroupRef.current.clone()

    // Replace CSS2DObjects with THREE.Sprite for text representation
    exportGroup.traverse((object) => {
      if (object instanceof CSS2DObject) {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: createTextTexture(object.element.textContent || ""),
            color: object.element.style.color,
          }),
        )
        sprite.position.copy(object.position)
        sprite.scale.set(5, 5, 1) // Adjust scale as needed
        object.parent?.add(sprite)
        object.removeFromParent()
      }
    })

    const exporter = new GLTFExporter()
    exporter.parse(
      exportGroup,
      (gltf) => {
        const output = JSON.stringify(gltf, null, 2)
        const blob = new Blob([output], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = "protein_model.gltf"
        link.click()

        URL.revokeObjectURL(url)
      },
      { binary: false },
    )
  }

  // Helper function to create a texture from text
  const createTextTexture = (text: string) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    canvas.width = 256
    canvas.height = 256

    ctx.fillStyle = "white"
    ctx.font = "Bold 36px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, 128, 128)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 min-w-[200px]">
        <Button
          onClick={() => setStructureType("primary")}
          variant={structureType === "primary" ? "primary" : "outline"}
          className={`w-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
            structureType === "primary"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-900/80 hover:bg-gray-800 border-gray-700"
          }`}
        >
          Primary Structure
        </Button>
        <Button
          onClick={() => setStructureType("alpha")}
          variant={structureType === "alpha" ? "primary" : "outline"}
          className={`w-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
            structureType === "alpha"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-900/80 hover:bg-gray-800 border-gray-700"
          }`}
        >
          α-Helix Structure
        </Button>
        <Button
          onClick={() => setStructureType("beta")}
          variant={structureType === "beta" ? "primary" : "outline"}
          className={`w-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
            structureType === "beta"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-900/80 hover:bg-gray-800 border-gray-700"
          }`}
        >
          β-Sheet Structure
        </Button>
        <Button
          onClick={() => setStructureType("tertiary")}
          variant={structureType === "tertiary" ? "primary" : "outline"}
          className={`w-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
            structureType === "tertiary"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-900/80 hover:bg-gray-800 border-gray-700"
          }`}
        >
          Tertiary Structure
        </Button>
        <Button
          onClick={() => setStructureType("quaternary")}
          variant={structureType === "quaternary" ? "primary" : "outline"}
          className={`w-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
            structureType === "quaternary"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-900/80 hover:bg-gray-800 border-gray-700"
          }`}
        >
          Quaternary Structure
        </Button>

        <Button
          onClick={exportModel}
          className="w-full mt-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Export 3D Model
        </Button>
      </div>
      <div
        ref={containerRef}
        className="w-full h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl relative"
        style={{ touchAction: "none" }}
      />
    </div>
  )
}

