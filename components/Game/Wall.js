import { usePlane } from '@react-three/cannon';

const Wall = () => {
  const [ref] = usePlane(() => ({ rotation: [0, 0, 0], position: [0, 0, 0], color: 'green' }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} color="green" />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

export default Wall;