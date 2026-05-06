import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import url from "/models/road-crossroad-path-transformed.glb?url";
import { useSelectableModel } from "../hooks/useSelectableModel";

type GLTFResult = {
  nodes: {
    ["road-crossroad-path_1"]: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

export default function RoadCrossroadPath({
  isSelected,
  ...props
}: JSX.IntrinsicElements["group"] & { isSelected: boolean }) {
  const { nodes, materials } = useSelectableModel<GLTFResult>(url, isSelected);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["road-crossroad-path_1"].geometry}
        material={materials.colormap}
      />
    </group>
  );
}

useGLTF.preload(url);
