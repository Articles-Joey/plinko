import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function GamepadOrbitController() {
    const { camera, controls } = useThree()
    const orbitTime = useRef(0)
    
    useFrame((state, delta) => {
        if (!controls) return

        const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
        const gamepad = Object.values(gamepads).find(g => g && g.connected)

        if (!gamepad) {
            orbitTime.current = 0
            return
        }

        const DEADZONE = 0.2
        
        // Sticks (Right Stick)
        const rx = gamepad.axes[2]
        const ry = gamepad.axes[3]
        
        // Buttons (Standard Gamepad Mapping)
        // 5: RB (Right Bumper)
        // 6: LT (Left Trigger)
        // 7: RT (Right Trigger)
        const rb = gamepad.buttons[5]?.pressed
        const lt = gamepad.buttons[6]?.value || 0
        const rt = gamepad.buttons[7]?.value || 0

        // 1. Zoom Logic (Triggers)
        // RT zooms IN (move forward), LT zooms OUT (move backward)
        const zoomNet = rt - lt
        if (Math.abs(zoomNet) > 0.05) {
            const zoomSpeed = 50.0 * delta // Adjust speed as needed
            
            // Vector from camera to target
            const vec = new THREE.Vector3().subVectors(controls.target, camera.position)
            const currentDist = vec.length()
            const moveDist = zoomNet * zoomSpeed

            // Prevent zooming past the target (min distance check)
            // Or use controls.minDistance if we were just setting properties, but we are moving manually
            if (currentDist > moveDist + 1.0) {
                vec.normalize()
                camera.position.addScaledVector(vec, moveDist)
                controls.update()
            } else if (moveDist < 0) {
                // Zooming out is safe
                 vec.normalize()
                camera.position.addScaledVector(vec, moveDist)
                controls.update()
            }
        }

        // 2. Pan Mode (Hold RB) VS Orbit Mode
        if (rb) {
            // --- PAN ---
            orbitTime.current = 0 // Reset orbit timer
            
            if (Math.abs(rx) > DEADZONE || Math.abs(ry) > DEADZONE) {
                const panSpeed = 60.0 * delta

                // Get camera-relative directions
                // We want to pan on the plane facing the camera
                const direction = new THREE.Vector3()
                camera.getWorldDirection(direction)

                const right = new THREE.Vector3()
                right.crossVectors(camera.up, direction).normalize() 
                // Note: camera.up might be world up (0,1,0) or local up? 
                // Usually OrbitControls keeps camera.up as (0,1,0).
                // But let's use the camera's local right vector for "Screen Right"
                // Actually `camera.getWorldDirection` gives Z-. 
                // Let's use camera matrix to get accurate local directions
                
                const camRight = new THREE.Vector3()
                const camUp = new THREE.Vector3()
                camera.matrixWorld.extractBasis(camRight, camUp, new THREE.Vector3())

                // RX controls Left/Right (camRight)
                // RY controls Up/Down (camUp)
                
                const offset = new THREE.Vector3()
                
                // Stick Right -> Move Camera Right -> Pan Right
                // Stick Left -> Move Camera Left -> Pan Left
                offset.addScaledVector(camRight, rx * panSpeed)
                
                // Stick Up (Usually -1) -> Move Camera Up -> Pan Up
                // Stick Down (Usually 1) -> Move Camera Down -> Pan Down
                offset.addScaledVector(camUp, -ry * panSpeed)

                // Move both camera and target to pan
                camera.position.add(offset)
                controls.target.add(offset)
                
                controls.update()
            }

        } else {
            // --- ORBIT ---
            
            let isActive = false
            
            if (Math.abs(rx) > DEADZONE || Math.abs(ry) > DEADZONE) {
                isActive = true
                orbitTime.current += delta
            } else {
                orbitTime.current = 0
            }

            if (isActive) {
                let orbitSpeed = 2.0 * delta
                
                // Acceleration: if held for > 2 seconds, boost speed
                if (orbitTime.current > 2.0) {
                    orbitSpeed *= 3 // 50% faster
                }

                // Apply orbit
                if (Math.abs(rx) > DEADZONE) {
                    controls.setAzimuthalAngle(controls.getAzimuthalAngle() - rx * orbitSpeed)
                }
                if (Math.abs(ry) > DEADZONE) {
                    controls.setPolarAngle(controls.getPolarAngle() - ry * orbitSpeed)
                }
                
                controls.update()
            }
        }
    })

    return null
}
