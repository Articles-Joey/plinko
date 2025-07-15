import { useEffect, useState, useRef, memo } from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'

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

function SpotLight(props) {

    const light = useRef()
    // useHelper(light, SpotLightHelper, 'cyan')

    return (
        <spotLight ref={light} intensity={300000} position={props.position} angle={0.75} penumbra={1} color={'orange'} />
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

    useEffect(() => {

        if (reload) {
            setReload(false)
        }

    }, [reload])

    useHotkeys('3', () => {
        console.log("Ball")
        addBall()
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

            <group>{[...Array(18)].map((o, i) => <Umbrella key={i} rotation={[Math.PI / 4, 0, 0]} scale={3} color={randomColor()} position={[-80 + (i * 10), -48, 16]} />)}</group>

            <group>{[...Array(19)].map((o, i) => <Umbrella key={i} rotation={[Math.PI / 4, 0, 0]} scale={3} color={randomColor()} position={[-86 + (i * 10), -58, 23]} />)}</group>

            {/* <Umbrella rotation={[Math.PI / 4, 0, 0]} scale={3} color="red" position={[0, -40, 15]} />
                            <Umbrella rotation={[Math.PI / 4, 0, 0]} scale={3} color="limegreen" position={[10, -40, 15]} /> */}

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

    return (
        <>
            {!reload &&
                <Canvas camera={{ position: [0, 20, 180], fov: 50 }}>

                    <hemisphereLight color="white" groundColor="black" intensity={1} />

                    <ambientLight intensity={2} />

                    <SpotLight
                        position={[0, 50, 300]}
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

                    <OrbitControls />

                </Canvas>
            }
        </>
    )
}

export default memo(GameCanvas)