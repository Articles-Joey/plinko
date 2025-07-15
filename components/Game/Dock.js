import { useBox } from "@react-three/cannon"
import { useState } from "react"

const floor_size = [10, 100, 10]

export const Dock = (props) => {

	const [isHovered, setIsHovered] = useState(false)

	const [ref] = useBox(() => ({
		type: 'Static',
		...props
	}))

	return (
		<mesh ref={ref}>
			<boxGeometry {...props} attach="geometry" />
			<meshStandardMaterial
				color={'#7c3f00'}
				// transparent={true}
				opacity={1}
				// attach="material"                 
            />
		</mesh>
	)
}