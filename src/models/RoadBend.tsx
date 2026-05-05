import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import url from "/models/road-bend-transformed.glb?url";
import { useSelectableModel } from "../hooks/useSelectableModel";

type GLTFResult = {
  nodes: {
    ["road-bend_1"]: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

export default function RoadBend({
  isSelected,
  ...props
}: JSX.IntrinsicElements["group"] & { isSelected: boolean }) {
  const { nodes, materials } = useSelectableModel<GLTFResult>(url, isSelected);

  return (
    <group {...props} dispose={null}>
      <mesh
        position={[0.5, 0.02, -0.5]}
        geometry={nodes["road-bend_1"].geometry}
        material={materials.colormap}
      />
    </group>
  );
}

useGLTF.preload(url);
