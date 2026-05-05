import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import grassUrl from "/models/grass-transformed.glb?url";
import { useSelectableModel } from "../hooks/useSelectableModel";

type GLTFResult = {
  nodes: {
    Mesh1_Group1_Model: THREE.Mesh;
  };
  materials: {
    Grass: THREE.MeshStandardMaterial;
  };
};

export default function Grass({
  isSelected,
  ...props
}: JSX.IntrinsicElements["group"] & { isSelected: boolean }) {
  const { nodes, materials } = useSelectableModel<GLTFResult>(
    grassUrl,
    isSelected,
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        position={[0, -0.5, 0]}
        castShadow
        geometry={nodes.Mesh1_Group1_Model.geometry}
        material={materials.Grass}
      />
    </group>
  );
}

useGLTF.preload(grassUrl);
