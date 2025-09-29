import { Model as ModelManBeach } from '@/components/Game/People/Beach';
import { Model as ModelWomanCasual } from '@/components/Game/People/Casual';

import { degToRad } from 'three/src/math/MathUtils';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function WalkingCrowd() {
    // Checklist:
    // - move walkers along the z axis (looping path)
    // - spawn CLUSTERS clusters spread along the path
    // - each cluster contains a random crowd size (1-4)
    // - crowdSpacing variable controls spacing between people inside a cluster
    // - each walker maintains cluster-relative offset so crowdSpacing stays meaningful when they loop

    const CLUSTERS = 15; // number of cluster starting points along path
    const MIN_MOTION = -205; // motion axis minimum (z)
    const MAX_MOTION = 205;  // motion axis maximum (z)
    const BASE_Y = -88;
    const BASE_Z = 34.5;

    // How far across the boardwalk cluster centers can be placed (x axis)
    const X_SPREAD = 8;

    // Adjustable spacing between people inside a cluster (change this to space out crowd people)
    const crowdSpacing = 2.0; // <-- tweak this value to spread cluster members apart

    const spacing = (MAX_MOTION - MIN_MOTION) / CLUSTERS;

    // Mutable walker state kept in refs to avoid re-renders
    const walkersRef = useRef([]);
    const walkerGroupsRef = useRef([]);

    const pickModel = () => (Math.random() < 0.5 ? 'man' : 'woman');
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Initialize clusters once; each cluster spawns 1-4 people with offsets based on crowdSpacing
    const initial = useMemo(() => {
        const arr = [];
        for (let c = 0; c < CLUSTERS; c++) {
            const clusterJitter = (Math.random() - 0.5) * spacing * 0.4; // jitter cluster center along z
            const clusterCenterZ = MIN_MOTION + c * spacing + clusterJitter;
            const clusterCenterX = (Math.random() - 0.5) * X_SPREAD; // lateral center
            const clusterSize = randInt(1, 4); // 1-4 people per cluster

            for (let j = 0; j < clusterSize; j++) {
                // center offsets so cluster is symmetrical
                const offsetIndex = j - (clusterSize - 1) / 2;
                const x = clusterCenterX + offsetIndex * crowdSpacing;
                const z = clusterCenterZ + (Math.random() - 0.5) * 0.6; // small within-cluster z jitter
                const speed = 0.03 + Math.random() * 0.04; // slight speed variance
                const startOffset = Math.random() * 1.2; // random animation start offset (seconds)
                const model = pickModel();
                arr.push({
                    x,
                    z,
                    speed,
                    startOffset,
                    model,
                    // keep cluster metadata to preserve spacing when looping
                    clusterIndex: c,
                    offsetIndex,
                    clusterCenterX,
                });
            }
        }
        walkersRef.current = arr;
        return arr;
    }, []);

    // Update positions each frame without causing React re-renders
    useFrame(() => {
        const walkers = walkersRef.current;
        for (let i = 0; i < walkers.length; i++) {
            const w = walkers[i];
            // Move along z axis in the positive direction
            w.z += w.speed;
            if (w.z > MAX_MOTION) {
                // looped around — reset z to MIN for this walker
                w.z = MIN_MOTION + (Math.random() - 0.5) * 0.6; // tiny jitter on reset

                // choose a new cluster center x and recalc x based on offsetIndex and crowdSpacing
                const newClusterCenterX = (Math.random() - 0.5) * X_SPREAD;
                w.clusterCenterX = newClusterCenterX;
                w.x = newClusterCenterX + w.offsetIndex * crowdSpacing;

                // randomize model and startOffset on loop
                w.model = pickModel();
                w.startOffset = Math.random() * 1.2;
            }

            const g = walkerGroupsRef.current[i];
            if (g) {
                g.position.z = w.z;
                g.position.x = w.x;
            }
        }
    });

    return (
        <group position={[0, BASE_Y, BASE_Z]} rotation={[degToRad(90), degToRad(-90), 0]}>
            {initial.map((w, i) => {
                const Comp = w.model === 'woman' ? ModelWomanCasual : ModelManBeach;
                return (
                    <group
                        key={i}
                        ref={(el) => (walkerGroupsRef.current[i] = el)}
                        position={[w.x, 0, w.z]}
                    >
                        {/* TODO - Make this dark mode only and optimize? */}
                        {/* <pointLight
                            position={[0, 2, 0]}
                            intensity={10}
                            distance={10}
                            color={'white'}
                            // castShadow
                        /> */}
                        <Comp action={"Walk"} animationRenderDistance={200} scale={2.5} startOffset={w.startOffset} />
                    </group>
                );
            })}
        </group>
    );
}
