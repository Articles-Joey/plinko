import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const link = `${process.env.NEXT_PUBLIC_CDN}games/Plinko/umbrella.gltf`

export default function Umbrella(props) {

    const { color } = props

    const { nodes, materials } = useGLTF(link);

    const newMaterial = useMemo(() => {

        const originalMaterial = materials["CrossPink_001"];
        const newMaterial = originalMaterial.clone();
    
        if (color) {
            newMaterial.color.set(color);
        }

        return newMaterial

    }, [])

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={
                    nodes[
                        "CuteUmbrella_CrossPink_CuteUmbrella_Log556-GRP-378912-CrossPink"
                    ].geometry
                }
                material={newMaterial}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes["CuteUmbrella_001_CuteUmbrella_Log556-GRP-378912-2"].geometry
                    }
                    material={materials["2.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes["CuteUmbrella_002_CuteUmbrella_Log556-GRP-378912-__"].geometry
                    }
                    material={materials.__}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes[
                            "CuteUmbrella_Material_CuteUmbrella_Log556-GRP-378912-Default_Ma"
                        ].geometry
                    }
                    material={materials.Default_Material}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={
                        nodes["CuteUmbrella_White_CuteUmbrella_Log556-GRP-378912-White"]
                            .geometry
                    }
                    material={materials.White}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload(link)