import { useState, useEffect } from "react"

import { useBox } from "@react-three/cannon"
import { useStore } from "@/hooks/useStore";
import Player from "./Player";

const wallHeight = 10;
const args = [420, 1, 200]

export default function PlayerBoundary(props) {

    const controlType = useStore(state => state.controlType);
    const setControlType = useStore(state => state.setControlType);

    return (
        <group>

            {
                controlType == "FPS"
                // ||
                // true
                &&
                <>

                    <BoundaryWall
                        args={args}
                        parentPosition={props.position}
                    />

                    {/* Border */}
                    <FloorBorderWall
                        floorArgs={args}
                        parentPosition={props.position}
                    />

                    {/* Boardwalk Fence */}
                    <BoundaryWall
                        args={[args[0], 6, 1]}
                        position={[0, 0, 74]}
                        parentPosition={props.position}
                    />

                    {controlType == "FPS" && <Player />}

                </>
            }

        </group>
    )
}

function FloorBorderWall({ floorArgs = [420, 1, 200], parentPosition }) {
    const [width, , depth] = floorArgs
    const halfW = width / 2
    const halfD = depth / 2

    return (
        <group>
            {/* Front */}
            <BoundaryWall
                args={[width, wallHeight, 1]}
                position={[0, wallHeight / 2, halfD]}
                parentPosition={parentPosition}
            />
            {/* Back */}
            <BoundaryWall
                args={[width, wallHeight, 1]}
                position={[0, wallHeight / 2, -halfD]}
                parentPosition={parentPosition}
            />
            {/* Left */}
            <BoundaryWall
                args={[1, wallHeight, depth]}
                position={[-halfW, wallHeight / 2, 0]}
                parentPosition={parentPosition}
            />
            {/* Right */}
            <BoundaryWall
                args={[1, wallHeight, depth]}
                position={[halfW, wallHeight / 2, 0]}
                parentPosition={parentPosition}
            />
        </group>
    );
}

function BoundaryWall(props) {

    const [refFloor] = useBox(() => ({
        type: 'Static',
        material: { friction: 0 },
        ...props,
        position: [
            (props.parentPosition?.[0] || 0) + (props.position?.[0] || 0),
            (props.parentPosition?.[1] || 0) + (props.position?.[1] || 0),
            (props.parentPosition?.[2] || 0) + (props.position?.[2] || 0),
        ],
        args: props.args,
    }))

    return (
        <mesh ref={refFloor} receiveShadow castShadow>
            <boxGeometry args={props.args} />
            <meshStandardMaterial
                // color={'white'}
                transparent={true}
                opacity={0}
            />
        </mesh>
    )
}