import { Cylinder } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils";

export default function SwimmingLane() {

    const ropeWidth = 0.1;

    return (
        <group
            rotation={[0, 0, Math.PI / 2]}
            position={[20, 0, -0.6]}
        >

            <Cylinder
                rotation={[0, 0, degToRad(0)]}
                args={[ropeWidth, ropeWidth, 60]}
                scale={1}
                material={new MeshStandardMaterial({ color: 'white' })}
                position={[-22.5, (160), 1]}
            />

            <Cylinder
                rotation={[0, 0, degToRad(0)]}
                args={[ropeWidth, ropeWidth, 60]}
                scale={1}
                material={new MeshStandardMaterial({ color: 'white' })}
                position={[59, (160), 1]}
            />

            {[...Array(7)].map((o, top_i) =>

                <group key={top_i}>

                    <>
                        {[...Array(18)].map((o, i) =>
                            <Cylinder
                                key={i}
                                rotation={[0, 0, Math.PI / 2]}
                                args={[0.25, 0.25, 3]}
                                scale={1}
                                material={new MeshStandardMaterial({ color: i % 2 === 0 ? 'red' : 'blue' })}
                                position={[-20 + (i * 4.5), (190 - (top_i * 10)), 1]}
                            />
                        )}
                    </>

                    <>
                        {[...Array(18)].map((o, i) =>
                            <Cylinder
                                key={i}
                                rotation={[0, 0, Math.PI / 2]}
                                args={[ropeWidth, ropeWidth, 5]}
                                scale={1}
                                material={new MeshStandardMaterial({ color: 'white' })}
                                position={[-20 + (i * 4.5), (190 - (top_i * 10)), 1]}
                            />
                        )}
                    </>

                </group>

            )}

        </group>
    )
}