import { useBox } from "@react-three/cannon"
import { useState } from "react"
import { Dock } from "./Dock"

const floor_size = [10, 100, 10]

export const Docks = () => {

	return (
		<group>
            <Dock position={[-50, 0, 0]} args={floor_size} ></Dock>
            <Dock position={[50, 0, 0]} args={floor_size} ></Dock>
        </group>
	)
}