import { usePlane } from '@react-three/cannon';

const Plane = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 5, 0, 0],
        position: [0, -45.5, 14],
        friction: 0.3
    }));

    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[220, 70]} />
            <meshStandardMaterial color="#C2B280" />
        </mesh>
    );
};

export default Plane;