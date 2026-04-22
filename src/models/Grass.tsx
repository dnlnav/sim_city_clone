import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { Mesh, MeshStandardMaterial } from "three";
import grassUrl from "/models/grass.gltf?url";

type GrassProps = ThreeElements["group"] & {
  emissive?: string;
  emissiveIntensity?: number;
};

export function Grass({
  emissive = "#000000",
  emissiveIntensity = 0,
  ...groupProps
}: GrassProps) {
  const { nodes, materials } = useGLTF(grassUrl);
  const mesh = nodes.Mesh1_Group1_Model as Mesh;

  // Clone once per GLTF material so each tile can be highlighted independently.
  const material = useMemo(
    () => (materials.Grass as MeshStandardMaterial).clone(),
    [materials.Grass],
  );

  useEffect(() => () => material.dispose(), [material]);

  return (
    <group {...groupProps} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={mesh.geometry}
        material={material}
        material-emissive={emissive}
        material-emissiveIntensity={emissiveIntensity}
      />
    </group>
  );
}

useGLTF.preload(grassUrl);
