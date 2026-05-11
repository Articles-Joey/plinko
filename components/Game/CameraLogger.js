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
            console.log("Teleporting camera to:", teleportLocation)
            camera.position.set(...teleportLocation)
            camera.lookAt(0, 0, 0)
            setTeleportLocation(false)
        }
    }, [teleportLocation])

    useEffect(() => {

        // return

        if (!teleportTarget) return
        // setTeleportTarget(false) // always reset so signal never gets stuck
        // if (!controlsRef.current) return

        controlsRef.current.target.set(...teleportTarget)
        camera.lookAt(...teleportTarget)
        setTeleportTarget(false)

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

        if (!teleportZoom) return
        setTeleportZoom(false) // always reset so signal never gets stuck
        if (!controlsRef.current) return

        const controls = controlsRef.current
        const target = controls.target

        // Reset minDistance so previous teleports don't block this one
        controls.minDistance = 0

        // Calculate direction from target to camera and position at teleportZoom distance
        const direction = new Vector3()
            .subVectors(camera.position, target)
            .normalize()

        const newPos = new Vector3()
            .copy(target)
            .add(direction.multiplyScalar(teleportZoom))

        camera.position.copy(newPos)
        controls.update()
    }, [teleportZoom, camera])

    useFrame(() => {

        // const controlType = useStore.getState().controlType
        // if (controlType == "FPS") {
        //     return
        // }

        if (controlsRef.current) {

            // console.log("New Camera position:", camera.position)

            // Store camera position and target in zustand store
            // setCameraPosition([
            //     camera.position.x,
            //     camera.position.y,
            //     camera.position.z
            // ])
            // const target = controlsRef.current.target
            // setCameraTarget([
            //     target.x,
            //     target.y,
            //     target.z
            // ])
        }
    })

    const controlType = useStore(state => state.controlType)
    if (controlType == "FPS") {
        return
    }

    return <OrbitControls ref={controlsRef} makeDefault />
}