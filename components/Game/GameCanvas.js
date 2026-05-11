import { useEffect, useState, useRef, memo, Suspense } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Cylinder, OrbitControls, Sky, Stats } from '@react-three/drei'

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
// import { useCameraStore } from '@/hooks/useCameraStore';
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
import { GamepadOrbitController } from './GamepadOrbitController';
import BoardwalkLights from './BoardwalkLights';
import CameraLogger from './CameraLogger';
import { ModelSecurityCamera } from './Security Camera';
import Player from './Player';
import PlayerBoundary from './PlayerBoundary';
import DecorativeContent from './DecorativeContent';
import KeyboardInputHandler from './KeyboardInputHandler';

function SpotLight(props) {

    const light = useRef()
    // useHelper(light, SpotLightHelper, 'cyan')

    return (
        <spotLight ref={light} intensity={300000} position={props.position} angle={0.75} penumbra={1} color={'orange'} />
    )
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

    // const hasHydrated = useStore(state => state._hasHydrated)

    const sceneOrientation = useStore(state => state.sceneOrientation);

    // const theme = useStore(state => state.theme);
    // const setTheme = useStore(state => state.setTheme);
    const darkMode = useStore(state => state.darkMode)
    const toggleDarkMode = useStore(state => state.toggleDarkMode)

    const betAmount = useStore(state => state.betAmount);

    const balls = useStore(state => state.balls)
    const addBall = useStore(state => state.addBall)
    const debug = useStore(state => state.debug)
    const showStats = useStore((state) => state?.debugConfig?.showStats);
    const reloadScene = useStore(state => state.reloadScene)
    // setDebug = useStore(state => state.setDebug);
    const controlType = useStore(state => state.controlType);
    // const setControlType = useStore(state => state.setControlType);

    // const [reload, setReload] = useState(false)

    const offlineWallet = useOfflineWallet(state => state.wallet);
    const setOfflineWallet = useOfflineWallet(state => state.setWallet);

    const loadDecorativeContent = useStore(state => state.loadDecorativeContent)
    const setLoadDecorativeContent = useStore(state => state.setLoadDecorativeContent)

    useEffect(() => {

        const timeout = setTimeout(() => {
            setLoadDecorativeContent(true)
        }, 1000)
        return () => clearTimeout(timeout);

    }, [])

    return (
        <Canvas
            camera={{
                position:
                    sceneOrientation == "Flat" ?
                        [100, 100, 100]
                        :
                        [0, 20, 180]
                ,
                fov: 50
            }}
        >

            {showStats && <>
                <Stats className="stats-overlay" />
            </>}

            <KeyboardInputHandler />

            <hemisphereLight color="gray" groundColor="black" intensity={darkMode ? 0.5 : 1} />

            <ambientLight intensity={darkMode ? 0 : 2} />

            <SpotLight
                position={darkMode ? [0, -100, 600] : [0, 50, 300]}
            // angle={1} 
            // penumbra={1}
            />

            {/* <spotLight ref={light} position={[50, 50, 20]} angle={0.15} penumbra={1} color={'red'} /> */}
            {/* <spotLight ref={light} position={[-50, 50, -20]} angle={0.15} penumbra={1} color={'green'} />
                    <spotLight ref={light} position={[50, 50, 40]} angle={0.15} penumbra={1} color={'red'} /> */}

            <Sky
                sunPosition={
                    darkMode ?
                        [0, -10, 200]
                        :
                        [0, 10, -200]
                }
            />

            <Physics
                gravity={[0, -30, 0]}
            >

                <Debug color="black" scale={debug ? 1 : 0}>
                    <PlayerBoundary
                        position={[
                            0, 34, 0
                        ]}
                    />
                </Debug>

            </Physics>

            <group
                rotation={[
                    sceneOrientation == "Flat" ? degToRad(-90) : 0,
                    0,
                    0
                ]}
            >

                {loadDecorativeContent && <DecorativeContent />}

                <Physics gravity={[0, -30, 0]}>

                    {/* {physicsContent} */}
                    {/* {gameContent} */}

                    <Suspense>

                        <Docks />

                        <WallOcean />

                        {balls?.map((item, item_i) =>
                            <Ball
                                key={item.spawned}
                                ball_key={item.spawned}
                                item={item}
                            />
                        )}

                        <group>
                            <Pegs />
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

                    </Suspense>

                </Physics>

                {/* <OrbitControls /> */}

                {/* Teleportation and Orbit */}
                <CameraLogger />

                <GamepadOrbitController />

            </group>

        </Canvas>
    )
}

export default memo(GameCanvas)