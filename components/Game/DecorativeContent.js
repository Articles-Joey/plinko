import { Model as ModelManBeach } from '@/components/Game/People/Beach';
import { ModelKennyNLFoodBurgerCheeseDouble } from '@/components/Game/burger-cheese-double';
import { Model as ModelWomanCasual } from '@/components/Game/People/Casual';
import { ModelKennyNLFoodFries } from '@/components/Game/fries';
import { ModelKennyNLFoodFishBones } from '@/components/Game/fish-bones';
import { ModelJToastieBuildingRed } from '@/components/Game/Building Red';
import { ModelJToastieWoodenFence } from '@/components/Game/Wooden Fence';
import { ModelJToastieParkBench } from '@/components/Game/Park Bench';
import SailingShip from './SailingShip';
import { degToRad } from 'three/src/math/MathUtils';
import WalkingCrowd from './WalkingCrowd';
import { ModelSecurityCamera } from './Security Camera';
import { useStore } from '@/hooks/useStore';
import { ModelQuaterniusFishingClownfish } from './Clownfish';
import SwimmingLane from './SwimmingLane';
import { Docks } from './Docks';
import Sand from './Sand';
import Boardwalk from './Boardwalk';
import Umbrella from './Umbrella';
import { Suspense, useEffect, useState } from 'react';
import WallOcean from './WallOcean';
import BoardwalkLights from './BoardwalkLights';

function randomColor() {
    return (`#${Math.floor(Math.random() * 16777215).toString(16)}`)
}

export default function DecorativeContent() {

    const sceneOrientation = useStore(state => state.sceneOrientation);
    const graphicsQuality = useStore(state => state.graphicsQuality);

    const [offsetTimeout, setOffsetTimeout] = useState(false)

    useEffect(() => {

        const timeout = setTimeout(() => {
            setOffsetTimeout(true)
        }, 1000)
        return () => clearTimeout(timeout);

    }, [])

    return (
        <group
        // rotation={[
        //     sceneOrientation == "Flat" ? degToRad(-90) : 0,
        //     0,
        //     0
        // ]}
        >

            <SailingShip />

            <ModelSecurityCamera
                position={[
                    180.9774810508111,
                    -94.8,
                    54.741008998981336
                ]}
                rotation={[degToRad(80), degToRad(-90), 0]}
                scale={0.5}
            />

            <WalkingCrowd />

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

                {/* Boardwalk Lights */}

            </group>

            <Suspense>
                <BoardwalkLights />
            </Suspense>

            {offsetTimeout && <Suspense>
                {/* BoardwalkBuildings */}
                <Suspense>
                    <group
                        position={[200, -100, 34.5]}
                        rotation={[-Math.PI / -2, -Math.PI, 0]}
                        scale={6}
                    >
                        {[...Array(23)].map((_, index) => {

                            if (graphicsQuality == "Low") return null

                            if (index % 2 == 0 && graphicsQuality == "Medium") {
                                return null;
                            }

                            return (
                                <group
                                    key={index}
                                    position={[index * 3, 0, 0]}
                                >
                                    <ModelJToastieBuildingRed />
                                </group>
                            )
                        })}
                    </group>
                </Suspense>

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
            </Suspense>}

            {/* On Boardwalk */}
            <Suspense>
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
            </Suspense>

            {/* On Beach */}
            <Suspense>
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
            </Suspense>

            <Suspense>
                <Sand
                    args={[420, 70]}
                    rotation={[-Math.PI / 5, 0, 0]}
                    position={[0, -45.5, 14]}
                />

                {/* Bottom flat layer */}
                {/* <Sand
                    args={[420, 70]}
                    position={[0, -71.5, 7]}
                /> */}
            </Suspense>

            {/* BoardWalk */}
            <Suspense>
                <Boardwalk
                    args={[420, 30]}
                    position={[0, -89, 34.5]}
                />
            </Suspense>

            <BeachUmbrellas />

            <SwimmingLane />

            <group position={[130, 10, 0]}>
                <ModelQuaterniusFishingClownfish
                    // position={[130, 250, 200]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={5}
                />
                {/* {theme == "Dark" &&
                                <pointLight
                                    position={[0, -9, 10]}
                                    intensity={2000}
                                    distance={20}
                                    color="orange"
                                    // castShadow
                                />
                            } */}
            </group>

            {/* <BeachSides /> */}

        </group>
    )

}

function BeachUmbrellas() {

    return (
        <>
            <group>{[...Array(18)].map((o, i) => <Umbrella key={i} rotation={[Math.PI / 4, 0, 0]} scale={3} color={randomColor()} position={[-200 + (i * 23), -48, 16]} />)}</group>

            <group>{[...Array(19)].map((o, i) => <Umbrella key={i} rotation={[Math.PI / 4, 0, 0]} scale={3} color={randomColor()} position={[-180 + (i * 21), -62, 26]} />)}</group>
        </>
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