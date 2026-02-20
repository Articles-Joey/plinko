import { useCameraStore } from "@/hooks/useCameraStore"
import { useStore } from "@/hooks/useStore"
import { OrbitControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"

export default function CameraLogger() {

    const controlsRef = useRef()
    const { camera } = useThree()

    const teleportLocation = useStore(state => state.teleportLocation)
    const setTeleportLocation = useStore(state => state.setTeleportLocation)

    const teleportTarget = useStore(state => state.teleportTarget)
    const setTeleportTarget = useStore(state => state.setTeleportTarget)

    const setCameraPosition = useCameraStore(state => state.setCameraPosition)
    const setCameraTarget = useCameraStore(state => state.setCameraTarget)

    const teleportZoom = useStore(state => state.teleportZoom)
    const setTeleportZoom = useStore(state => state.setTeleportZoom)

    useEffect(() => {
        if (teleportLocation) {
            camera.position.set(...teleportLocation)
            camera.lookAt(0, 0, 0)
            setTeleportLocation(false)
        }
    }, [teleportLocation])

    useEffect(() => {
        if (teleportTarget && controlsRef.current) {
            // Move the OrbitControls target to the new location
            controlsRef.current.target.set(...teleportTarget)
            camera.lookAt(...teleportTarget)
            setTeleportTarget(false)
        }
    }, [teleportTarget, camera])

    // useEffect(() => {
    //     if (teleportZoom) {

    //         // camera.zoom = teleportZoom
    //         // camera.updateProjectionMatrix()
    //         controlsRef.current.dollyIn(0); 
    //         controlsRef.current.update();

    //         setTeleportZoom(false)
    //     }
    // }, [teleportZoom, camera])

    useEffect(() => {
        if (teleportZoom && controlsRef.current) {
            const controls = controlsRef.current
            const target = controls.target

            // 1. Set the limit so you CAN zoom in all the way
            controls.minDistance = teleportZoom

            // 2. Calculate the direction from target to camera
            const direction = new Vector3()
                .subVectors(camera.position, target)
                .normalize()

            // 3. Move camera to the "fully zoomed" position (minDistance away)
            const newPos = new Vector3()
                .copy(target)
                .add(direction.multiplyScalar(controls.minDistance))

            camera.position.copy(newPos)

            // 4. Update controls to reflect manual camera change
            controls.update()

            setTeleportZoom(false)
        }
    }, [teleportZoom, camera])

    useFrame(() => {
        if (controlsRef.current) {
            // Store camera position and target in zustand store
            setCameraPosition([
                camera.position.x,
                camera.position.y,
                camera.position.z
            ])
            const target = controlsRef.current.target
            setCameraTarget([
                target.x,
                target.y,
                target.z
            ])
        }
    })

    return <OrbitControls ref={controlsRef} makeDefault />
}