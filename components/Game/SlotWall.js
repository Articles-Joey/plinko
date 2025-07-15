import { useBox } from "@react-three/cannon"
import { useState } from "react"

const floor_size = [10, 100, 10]

export default function SlotWall(props) {

	const [isHovered, setIsHovered] = useState(false)

	const [ref] = useBox(() => ({
		type: 'Static',
		...props
	}))

	return (
		<mesh ref={ref}>
			<boxGeometry {...props} attach="geometry" />
			<meshStandardMaterial
				color={'white'}
				transparent={true}
				opacity={0.1}
				// attach="material"                 
            />
		</mesh>
	)
}