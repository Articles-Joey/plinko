import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ModelKennyNLPirateShipDark } from '@/components/Game/ship_dark';
import { degToRad } from 'three/src/math/MathUtils';

export default function SailingShip() {
    const groupRef = useRef(); // Reference to the group
    const direction = useRef(0.25); // Direction of movement (1 for right, -1 for left)
  
    // Animate the group
    useFrame(() => {
      if (groupRef.current) {
        // Update position
        groupRef.current.position.x += direction.current;
  
        // Check bounds and reset if necessary
        if (groupRef.current.position.x >= 150) {
          groupRef.current.position.x = -150; // Jump back to -50
        }
      }
    });
  
    return (
      <group
        ref={groupRef}
        rotation={[0, 0, degToRad(-90)]}
        position={[-50, 80, 0]} // Start at -50
      >
        <ModelKennyNLPirateShipDark scale={3} rotation={[degToRad(90), 0, 0]} />
        <ModelKennyNLPirateShipDark scale={3} position={[-15, -10, 0]} rotation={[degToRad(90), 0, 0]} />
      </group>
    );
  }