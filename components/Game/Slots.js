import Slot from "./Slot"

const floor_size = [1, 8, 5]

export default function Slots(props) {

    return (
        <group>
            {[...Array(19)].map( (o, i) => {
                return <Slot key={i} position={[-45 + (i * 5), -25, 3]} args={floor_size} />
            } )}
            {/* <Slot position={[-10, -25, 3]} args={floor_size} ></Slot>
            <Slot position={[-5, -25, 3]} args={floor_size} ></Slot>
            <Slot position={[0, -25, 3]} args={floor_size} ></Slot>
            <Slot position={[5, -25, 3]} args={floor_size} ></Slot>
            <Slot position={[10, -25, 3]} args={floor_size} ></Slot> */}
        </group>
    )
}