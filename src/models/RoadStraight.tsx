import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import roadStraightUrl from "/models/road-straight-transformed.glb?url";
import { useSelectableModel } from "../hooks/useSelectableModel";

type GLTFResult = {
  nodes: {
    ["road-straight_1"]: THREE.Mesh;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
};

export default function RoadStraight({
  isSelected,
  ...props
}: JSX.IntrinsicElements["group"] & { isSelected: boolean }) {
  const { nodes, materials } = useSelectableModel<GLTFResult>(
    roadStraightUrl,
    isSelected,
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["road-straight_1"].geometry}
        material={materials.colormap}
      />
    </group>
  );
}

useGLTF.preload(roadStraightUrl);
