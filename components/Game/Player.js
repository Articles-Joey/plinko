import * as THREE from "three"
import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { PointerLockControls } from "@react-three/drei"
const JUMP_FORCE = 20
const SPEED = 10
const SPRINT_MULTIPLIER = 2
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

  // Keyboard state — jumpReady resets on Space release, preventing mid-air re-jumps while holding
  const keys = useRef({ forward: false, backward: false, left: false, right: false, jump: false, sprint: false })
  const jumpReady = useRef(true)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return
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
        case "ShiftLeft":
        case "ShiftRight":
          keys.current.sprint = true
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
          jumpReady.current = true
          break
        case "ShiftLeft":
        case "ShiftRight":
          keys.current.sprint = false
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
    const { forward, backward, left, right, jump, sprint } = keys.current

    // Update camera position to match player
    camera.position.set(position.current[0], position.current[1] + 1.5, position.current[2])

    // Movement calculation — sprint doubles speed
    const speed = SPEED * (sprint ? SPRINT_MULTIPLIER : 1)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    // jumpReady prevents re-jumping while Space is held; only fires when grounded
    if (jump && jumpReady.current && Math.abs(velocity.current[1]) < 0.05) {
      jumpReady.current = false
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