import { useStore } from "@/hooks/useStore";
import LightpostSingle from "./LightpostSingle";
import { degToRad } from "three/src/math/MathUtils";

export default function BoardwalkLights() {

    const darkMode = useStore(state => state.darkMode)

    return (
        <group>

            {/* Pier Lights */}
            {true && <group position={[50, -20, 5]}>

                <group position={[-96, -5, 0]}>
                    {[...Array(5)].map((_, index) => (
                        <group
                            key={index}
                            position={[0, index * 17, 0]} // Increment x-position by 1 for each building
                            rotation={[-Math.PI / -2, degToRad(-90), 0]}
                            scale={[8, 10, 8]}
                        >

                            <LightpostSingle />

                            {darkMode && <>
                                {/* <pointLight
                                    position={[0, 1, 0.5]}
                                    intensity={50}
                                    distance={80}
                                    color={'yellow'}
                                // castShadow
                                /> */}

                                <pointLight
                                    position={[0, 0.3, 0]}
                                    intensity={30}
                                    distance={0}
                                    color={'yellow'}
                                // castShadow
                                />
                            </>}

                        </group>
                    ))}
                </group>

                <group position={[-4, -5, 0]}>
                    {[...Array(5)].map((_, index) => (
                        <group
                            key={index}
                            position={[0, index * 17, 0]} // Increment x-position by 1 for each building
                            rotation={[-Math.PI / -2, degToRad(90), 0]}
                            scale={[8, 10, 8]}
                        >

                            <LightpostSingle />

                            {darkMode && <>
                                {/* <pointLight
                                    position={[0, 1, 0.5]}
                                    intensity={30}
                                    distance={0}
                                    color={'yellow'}
                                // castShadow
                                /> */}

                                <pointLight
                                    position={[0, 0.3, 0]}
                                    intensity={30}
                                    distance={0}
                                    color={'yellow'}
                                // castShadow
                                />
                            </>}

                        </group>
                    ))}
                </group>

            </group>}

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

                        {darkMode && <>

                            <pointLight
                                position={[0, 0.5, 0.5]}
                                intensity={40}
                                distance={0}
                                color={'yellow'}
                                scale={1}
                            // castShadow
                            />

                            {/* <pointLight
                                            position={[0, 1, 0]}
                                            intensity={50}
                                            distance={80}
                                            color={'yellow'}
                                            // castShadow
                                        /> */}

                        </>}

                    </group>
                ))}
            </group>

        </group>
    )
}