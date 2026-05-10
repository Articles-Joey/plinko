import * as THREE from "three"
import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { PointerLockControls } from "@react-three/drei"
const JUMP_FORCE = 20
const SPEED = 10
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export default function Player() {
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  const position = useRef([0, 10, 0])

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 60, 0],
    args: [2],
    linearDamping: 0.95,
    angularDamping: 1,
    material: { friction: 0 },
  }))

  useEffect(() => {
    const unsubVel = api.velocity.subscribe((v) => (velocity.current = v))
    const unsubPos = api.position.subscribe((p) => (position.current = p))
    return () => {
      unsubVel()
      unsubPos()
    }
  }, [api])

  // Simple keyboard state
  const keys = useRef({ forward: false, backward: false, left: false, right: false, jump: false })

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = true
          break
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = true
          break
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = true
          break
        case "KeyD":
        case "ArrowRight":
          keys.current.right = true
          break
        case "Space":
          keys.current.jump = true
          break
      }
    }
    const handleKeyUp = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = false
          break
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = false
          break
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = false
          break
        case "KeyD":
        case "ArrowRight":
          keys.current.right = false
          break
        case "Space":
          keys.current.jump = false
          break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame(() => {
    const { forward, backward, left, right, jump } = keys.current

    // Update camera position to match player
    camera.position.set(position.current[0], position.current[1] + 1.5, position.current[2])

    // Movement calculation
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2])
    }
  })

  return (
    <>
      <mesh ref={ref} />
      <PointerLockControls selector="#game-canvas" />
    </>
  )
}