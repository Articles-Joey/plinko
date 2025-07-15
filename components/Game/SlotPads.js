import { useState } from "react";
import SlotPad from "./SlotPad"
import { useBox } from "@react-three/cannon";

import { degToRad } from "three/src/math/MathUtils";
import { Boat } from "./Boat";

const floor_size = [5, 1, 5]

let convertIndexToPlayMultiplier = [
    10,
    8,
    6,
    4,
    2,
    1,
    0.5,
    0.2,
    0
]

export default function SlotPads(props) {

    const { removeBall } = props;

    return (
        <group>
            {[...Array(18)].map((o, i) => {

                let finalScore

                if (i > 8) {
                    let reversedConvertIndexToPlayMultiplier = [...convertIndexToPlayMultiplier]
                    reversedConvertIndexToPlayMultiplier.reverse()

                    finalScore = reversedConvertIndexToPlayMultiplier[i - 9]
                } else {
                    finalScore = convertIndexToPlayMultiplier[i]
                }

                return (
                    <group
                        key={i}
                    // position={[-42.5 + (i * 5), -25, 3]}
                    >

                        <SlotPad
                            removeBall={removeBall}
                            args={floor_size}
                            score={finalScore}
                            position={[-42.5 + (i * 5), -25, 3]}
                        />

                        <SlotWall
                            position={[-40 + (i * 5), -30, 3]}
                            args={[0.1, 15, 5]}
                        />

                        {![3, 7, 8, 11].includes(i) &&
                            <Boat
                                position={[-42.5 + (i * 5), -35, 6.5]}
                                rotation={[degToRad(60), 0, 0]}
                                scale={4}
                            />
                        }

                    </group>
                )
            })}
        </group>
    )
}

function SlotWall({ position, args }) {

    const [isHovered, setIsHovered] = useState(false)

    const [ref] = useBox(() => ({
        type: 'Static',
        position: position,
        args: args
    }))

    return (
        <mesh ref={ref}>
            <boxGeometry args={args} attach="geometry" />
            <meshStandardMaterial
                color={'saddlebrown'}
                transparent={true}
                opacity={1}
            />
        </mesh>
    )
}