import { useCylinder } from '@react-three/cannon';

const Peg = ( {position} ) => {

  const [ref] = useCylinder(() => ({ 
    mass: 0, 
    args: [1, 1, 5, 50], 
    position: position, 
    rotation: [-Math.PI / 2, 0, 0],
    collisionFilterGroup: 2, // Group for pegs
    collisionFilterMask: 1,  // Collide with objects in group 1 (e.g., ball)
    // restitution: 0.8,
    // restitution: 0,
    // friction: 0
    userData: {
      isPeg: true
    }
}));

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[1, 1, 5, 100]} />
      <meshStandardMaterial color="saddlebrown" />
    </mesh>
  );
};

export default Peg;