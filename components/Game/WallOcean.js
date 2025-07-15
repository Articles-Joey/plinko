import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'
import { usePlane } from '@react-three/cannon'

extend({ Water })

const link = `${process.env.NEXT_PUBLIC_CDN}games/Race Game/waternormals.jpeg`

export default function WallOcean(props) {

    let position = [0, 50, 0.2]

    const [ref] = usePlane(() => ({ rotation: [0, 0, 0], position: position, color: 'green' }));
    const gl = useThree((state) => state.gl)

    const collisionPlaneRef = useRef()

    const waterNormals = useLoader(THREE.TextureLoader, link)

    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

    const geom = useMemo(() => new THREE.PlaneGeometry(420, 200), [])

    const config = useMemo(
        () => ({
            textureWidth: 300,
            textureHeight: 300,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: false,
            format: gl.encoding
        }),
        [waterNormals]
    )

    useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))

    const [collisionPlaneProps] = usePlane(() => ({
        rotation: [0, 0, 0],
        position: position,
        color: 'green',
    }))

    return (
        <>
            <water ref={ref} args={[geom, config]} {...props} rotation-x={-Math.PI / 2} />
            <mesh ref={collisionPlaneRef} {...collisionPlaneProps} />
        </>
    )
}