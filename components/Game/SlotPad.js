import { useState, useEffect } from "react"

import { useBox } from "@react-three/cannon"
import { Text } from "@react-three/drei";

export default function SlotPad(props) {

    const { removeBall, position, args, score } = props;

    const [isBallTouching, setIsBallTouching] = useState(false);
    const [collidingObject, setCollidingObject] = useState(null);

    const [ref] = useBox(() => ({
        type: 'Static',
        ...props,
        isTrigger: true,
        onCollide,
        onCollideEnd,
        userData: {
            score: score
        }
    }))

    function onCollide(e) {

        console.log('Collision event on BoxTrigger', e)
        setCollidingObject(e.body);
        setIsBallTouching(true)

    }

    function onCollideEnd(e) {
        console.log('Collision ended on BoxTrigger', e)
        setCollidingObject(null);
        setIsBallTouching(false)
    }

    // Function to remove the colliding object from the scene
    const removeCollidingObject = () => {
        if (collidingObject) {
            // Remove or handle the collidingObject as needed
            // For example, if you're using react-three-fiber, you can use the `remove` method
            // of the fiber ref to remove the object from the scene
            collidingObject && collidingObject.remove();
        }
    };

    // Call removeCollidingObject when isBallTouching changes to true
    useEffect(() => {
        if (isBallTouching) {
            // removeBall()
            removeCollidingObject();
        }
    }, [isBallTouching]);

    return (
        <group {...props}>

            <Text 
                position={[0, -5, 3]}
                color="black"
                scale={2}
            >
                {score}
            </Text>

            <mesh ref={ref} position={[0, 0, 0]}>
                <boxGeometry attach="geometry" />
                <meshStandardMaterial
                    color={isBallTouching ? 'red' : 'white'}
                    // transparent={true}
                    opacity={1}
                // attach="material"                 
                />
            </mesh>
            
        </group>
    )
}