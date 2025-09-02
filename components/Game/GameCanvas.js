import { useEffect, useState, useRef, memo } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Cylinder, OrbitControls, Sky } from '@react-three/drei'

import { Debug, Physics } from '@react-three/cannon';

import Pegs from './Pegs';
import Ball from './Ball';
import BeachPlane from './Plane';

import Wall from './Wall';
import WallOcean from './WallOcean';

import { Docks } from './Docks';
import Slots from './Slots';

import { useHotkeys } from 'react-hotkeys-hook';
import SlotWall from './SlotWall';
import Umbrella from './Umbrella';
import SlotPads from './SlotPads';
// import { SpotLightHelper } from 'three';
import { useStore } from '@/hooks/useStore';
import Sand from './Sand';
import Boardwalk from './Boardwalk';

import { Model as ModelManBeach } from '@/components/Game/People/Beach';
import { ModelKennyNLFoodBurgerCheeseDouble } from '@/components/Game/burger-cheese-double';
import { Model as ModelWomanCasual } from '@/components/Game/People/Casual';
import { ModelKennyNLFoodFries } from '@/components/Game/fries';
import { ModelKennyNLFoodFishBones } from '@/components/Game/fish-bones';
import { ModelJToastieBuildingRed } from '@/components/Game/Building Red';
import { ModelJToastieWoodenFence } from '@/components/Game/Wooden Fence';
import { ModelJToastieParkBench } from '@/components/Game/Park Bench';
import SailingShip from './SailingShip';
import { useOfflineWallet } from '@/hooks/useOfflineWallet';
import { MeshStandardMaterial } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import SwimmingLane from './SwimmingLane';
import { ModelQuaterniusFishingClownfish } from './Clownfish';
import LightpostSingle from './LightpostSingle';
import WalkingCrowd from './WalkingCrowd';

function SpotLight(props) {

    const light = useRef()
    // useHelper(light, SpotLightHelper, 'cyan')

    return (
        <spotLight ref={light} intensity={300000} position={props.position} angle={0.75} penumbra={1} color={'orange'} />
    )
}

function CameraLogger() {
    const controlsRef = useRef()
    const { camera } = useThree()

    const teleportLocation = useStore(state => state.teleportLocation)
    const setTeleportLocation = useStore(state => state.setTeleportLocation)

    useEffect(() => {

        if (teleportLocation) {
            console.log("New value detected for teleportLocation", teleportLocation)
            camera.position.set(...teleportLocation)
            camera.lookAt(0, 0, 0)
            setTeleportLocation(false)
        }

    }, [teleportLocation])

    // useFrame(state => {
    //     state.camera.lerp({ x, y, z }, 0.1)
    //     state.camera.lookAt(0, 0, 0)
    // })

    useFrame(() => {

        // For logging camera position for debugging
        return

        if (controlsRef.current) {
            // Logs the camera position every frame
            console.log(
                `Camera position: x=${camera.position.x.toFixed(2)}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`
            )

            // Optional: Log target too
            const target = controlsRef.current.target
            console.log(
                `Target: x=${target.x.toFixed(2)}, y=${target.y.toFixed(2)}, z=${target.z.toFixed(2)}`
            )
        }
    })

    return <OrbitControls ref={controlsRef} />
}

function BeachSides() {
    return (
        <group
            position={[210, -60, 25]}
            rotation={[0, Math.PI / 2, 0]}
            scale={5}
        >
            <mesh>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={new Float32Array([
                            0, 0, 0,    // Point 1
                            5, 0, 0,    // Point 2
                            5, 5, 0,    // Point 3
                            0, 5, 0,    // Point 4
                            2.5, 2.5, 2 // Point 5 (raised center)
                        ])}
                        count={5}
                        itemSize={3}
                    />
                    {/* <bufferAttribute
                    attach="attributes-index"
                    array={new Uint16Array([
                        0, 1, 4,
                        1, 2, 4,
                        2, 3, 4,
                        3, 0, 4
                    ])}
                    count={12}
                    itemSize={1}
                /> */}
                </bufferGeometry>
                <meshStandardMaterial color="orange" side={2} />
            </mesh>
        </group>
    )
}

function GameCanvas({ scale, children }) {

    const {
        balls,
        addBall,
        debug,
        setDebug
    } = useStore(state => ({
        balls: state.balls,
        addBall: state.addBall,
        debug: state.debug,
        setDebug: state.setDebug
    }));

    const [reload, setReload] = useState(false)

    const offlineWallet = useOfflineWallet(state => state.wallet);
    const setOfflineWallet = useOfflineWallet(state => state.setWallet);

    useEffect(() => {

        if (reload) {
            setReload(false)
        }

    }, [reload])

    useHotkeys('3', () => {
        console.log("Ball")
        addBall("Online")
        // setBallCount(ballCount + 1)
        // setActiveBalls(prev => [
        //     ...prev,
        //     {
        //         spawned: Date.now()
        //     }
        // ])
    });

    useHotkeys('4', () => {
        console.log("Ball")
        addBall("Offline")
        setOfflineWallet({
            ...offlineWallet,
            total: (offlineWallet?.total || 0) - 10
        })

        // setBallCount(ballCount + 1)
        // setActiveBalls(prev => [
        //     ...prev,
        //     {
        //         spawned: Date.now()
        //     }
        // ])

    });

    useHotkeys('2', () => {
        console.log("2 is used to reload game for Dev debugging")
        setReload(true)
    });

    useHotkeys('1', () => {
        console.log("Clear")
        setBallCount(0)
    });

    function randomColor() {

        return (`#${Math.floor(Math.random() * 16777215).toString(16)}`)

    }

    const [ballCount, setBallCount] = useState(1)

    const [activeBalls, setActiveBalls] = useState([
        {
            spawned: Date.now()
        }
    ])

    // function removeBall(i, balls) {
    //     console.log("Remove this shit!", i)

    //     let newArray = [...balls.filter(obj => obj.spawned !== i)]
    //     console.log("newArray", newArray)
    //     setActiveBalls(newArray)

    //     // console.log("activeBalls", activeBalls)
    //     // setActiveBalls( prev => prev.filter(obj => obj.spawned !== i) )
    // }

    let gameContent = (
        <>

            {/* <Ball /> */}

            {balls?.map((item, item_i) =>
                <Ball
                    key={item.spawned}
                    ball_key={item.spawned}
                    item={item}
                />
            )}

            <WallOcean />
            {/* <Wall /> */}

            <group>
                <Pegs />
            </group>

            {/* On Pier */}
            <group position={[50, -20, 5]}>
                <ModelManBeach
                    // position={[50, -20, 5]}
                    rotation={[-Math.PI / -2, 0, 0]}
                    scale={2.5}
                />

                <ModelWomanCasual
                    position={[0, -2, 0]}
                    rotation={[-Math.PI / -2, 0, 0]}
                    scale={2.5}
                />

                <ModelKennyNLFoodBurgerCheeseDouble
                    position={[0, -4, 0]}
                    rotation={[-Math.PI / -2, 0, 0]}
                    scale={2.5}
                />
                <ModelKennyNLFoodFries
                    position={[0, -6, 0]}
                    rotation={[-Math.PI / -2, 0, 0]}
                    scale={2.5}
                />
                <ModelKennyNLFoodFishBones
                    position={[0, -8, 0]}
                    rotation={[-Math.PI / -2, 0, 0]}
                    scale={2.5}
                />
            </group>

            {/* On Beach */}
            <group
                position={[0, -50, 18]}
                rotation={[-Math.PI / -2, 0, 0]}
                scale={2.5}
            >
                <ModelManBeach
                // position={[50, -20, 5]}
                // rotation={[-Math.PI / -2, 0, 0]}
                // scale={2.5}
                />

                <ModelWomanCasual
                    position={[2, 0, 0]}
                // rotation={[-Math.PI / -2, 0, 0]}
                // scale={2.5}
                />

                <ModelKennyNLFoodBurgerCheeseDouble
                    position={[1, 0, 0]}
                    scale={2.5}
                />

                <ModelKennyNLFoodFries
                    position={[-1, 0, 0]}
                    scale={2.5}
                />
            </group>

            <WalkingCrowd />

            {/* BoardwalkBuildings */}
            <group
                position={[200, -100, 34.5]}
                rotation={[-Math.PI / -2, -Math.PI, 0]}
                scale={6}
            >
                {[...Array(23)].map((_, index) => (
                    <group
                        key={index}
                        position={[index * 3, 0, 0]} // Increment x-position by 1 for each building
                    // rotation={[-Math.PI / -2, -Math.PI, 0]}
                    // scale={6}
                    >
                        <ModelJToastieBuildingRed />
                    </group>
                ))}
            </group>

            {/* Boardwalk Lights */}
            <group position={[-200, 0, 0]}>
                {[...Array(21)].map((_, index) => (
                    <group
                        key={index}
                        position={[index * 20, -75, 34.5]} // Increment x-position by 1 for each building
                        rotation={[-Math.PI / -2, degToRad(0), 0]}
                        scale={[8, 10, 8]}
                    >

                        <LightpostSingle />

                        <pointLight
                            position={[0, 1.3, 0]}
                            intensity={100}
                            distance={100}
                            color={'yellow'}
                            castShadow
                        />

                    </group>
                ))}
            </group>

            {/* Boardwalk Railings */}
            <group
                position={[207, -74.2, 34.5]}
                rotation={[-Math.PI / -2, -Math.PI, 0]}
                scale={3}
            >
                {[...Array(78)].map((_, index) => (
                    <group
                        key={index}
                        position={[index * 1.8, 0, 0]} // Increment x-position by 1 for each building
                    // rotation={[-Math.PI / -2, -Math.PI, 0]}
                    // scale={6}
                    >
                        <ModelJToastieWoodenFence
                        // scale={1.25}
                        />
                    </group>
                ))}
                {[...Array(78 / 2)].map((_, index) => (
                    <group
                        key={index}
                        position={[index * 3.6, 0, -1.5]} // Increment x-position by 1 for each building
                    // rotation={[-Math.PI / -2, -Math.PI, 0]}
                    // scale={6}
                    >
                        <ModelJToastieParkBench
                            rotation={[0, -Math.PI / 2, 0]}
                            scale={0.5}
                        />
                    </group>
                ))}
            </group>

            {/* On Boardwalk */}
            <group
                position={[0, -78, 34.5]}
                rotation={[-Math.PI / -2, 0, 0]}
                scale={2.5}
            >
                <ModelManBeach
                    position={[-1, 0, 0]}
                // rotation={[-Math.PI / -2, 0, 0]}
                // scale={2.5}
                />

                {/* <ModelJToastieWoodenFence
                                    position={[0, 0, -1.5]}
                                    // rotation={[-Math.PI / -2, 0, 0]}
                                    scale={1.25}
                                /> */}

                {/* <ModelJToastieParkBench
                                    scale={0.5}
                                    rotation={[0, -Math.PI / -2, 0]}
                                /> */}

                <ModelWomanCasual
                    position={[2, 0, 0]}
                // rotation={[-Math.PI / -2, 0, 0]}
                // scale={2.5}
                />

                <ModelKennyNLFoodBurgerCheeseDouble
                    position={[1, 0.5, 0]}
                    scale={1.5}
                />

                <ModelKennyNLFoodFries
                    position={[0.25, 0.5, 0]}
                    scale={1.5}
                />

                <ModelKennyNLFoodFishBones
                    position={[3, 0, 0]}
                    scale={2.5}
                />
            </group>

            <SlotWall
                position={[0, -20, 5]}
                args={[90, 8, 0.25]}
            />


            <SlotPads
                position={[0, -20, 5]}
                args={[100, 8, 0.25]}
            // removeBall={removeBall}
            />

            <Docks />

            {/* <BeachPlane /> */}

            <Sand
                // args={[20, 20]}
                // position={[0, -5, 10]}
                // rotation={[-90 * Math.PI / 180, 0, 0]}
                args={[420, 70]}
                rotation={[-Math.PI / 5, 0, 0]}
                position={[0, -45.5, 14]}
            />

            {/* Bottom flat layer */}
            <Sand
                // args={[20, 20]}
                // position={[0, -5, 10]}
                // rotation={[-90 * Math.PI / 180, 0, 0]}
                args={[420, 70]}
                // rotation={[-Math.PI / 5, 0, 0]}
                position={[0, -71.5, 7]}
            />

            {/* BoardWalk */}
            {/* <mesh position={[0, -83.5, 34.5]}>
                                <planeGeometry
    
                                    args={[220, 20]}
                                />
                                <meshStandardMaterial color="#000" />
                            </mesh> */}

            <Boardwalk
                args={[420, 30]}
                position={[0, -89, 34.5]}
            />

            {/* <SlotWall
                                position={[0, 20, 5]}
                                args={[100, 8, 0.25]}
                            /> */}

            <group>{[...Array(18)].map((o, i) => <Umbrella key={i} rotation={[Math.PI / 4, 0, 0]} scale={3} color={randomColor()} position={[-200 + (i * 23), -48, 16]} />)}</group>

            <group>{[...Array(19)].map((o, i) => <Umbrella key={i} rotation={[Math.PI / 4, 0, 0]} scale={3} color={randomColor()} position={[-180 + (i * 21), -62, 26]} />)}</group>

            <SwimmingLane />

            <group position={[130, 10, 0]}>
                <ModelQuaterniusFishingClownfish
                    // position={[130, 250, 200]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={5}
                />
            </group>

            <BeachSides />

        </>
    )

    let physicsContent
    if (debug) {
        physicsContent = (
            <Debug>
                {gameContent}
            </Debug>
        )
    } else {
        physicsContent = (
            gameContent
        )
    }

    const theme = useStore(state => state.theme);

    return (
        <>
            {!reload &&
                <Canvas camera={{ position: [0, 20, 180], fov: 50 }}>

                    <hemisphereLight color="gray" groundColor="black" intensity={theme === "Dark" ? 0.5 : 1} />

                    <ambientLight intensity={theme === "Dark" ? 0 : 2} />

                    <SpotLight
                        position={theme === "Dark" ? [0, -100, 600] : [0, 50, 300]}
                    // angle={1} 
                    // penumbra={1}
                    />

                    {/* <spotLight ref={light} position={[50, 50, 20]} angle={0.15} penumbra={1} color={'red'} /> */}
                    {/* <spotLight ref={light} position={[-50, 50, -20]} angle={0.15} penumbra={1} color={'green'} />
                    <spotLight ref={light} position={[50, 50, 40]} angle={0.15} penumbra={1} color={'red'} /> */}

                    <Sky
                        sunPosition={[0, 10, -200]}
                    />

                    <SailingShip

                    />

                    <Physics gravity={[0, -30, 0]}>

                        {physicsContent}

                    </Physics>

                    {/* <OrbitControls /> */}

                    <CameraLogger />

                </Canvas>
            }
        </>
    )
}

export default memo(GameCanvas)