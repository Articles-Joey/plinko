import { useBox } from "@react-three/cannon"
import { useState } from "react"

export default function Slot(props) {

	const [ref] = useBox(() => ({
		type: 'Static',
		...props
	}))

	return (
		<mesh ref={ref}>
			<boxGeometry {...props} attach="geometry" />
			<meshStandardMaterial
				color={'white'}
				// transparent={true}
				opacity={1}
				// attach="material"                 
            />
		</mesh>
	)
}