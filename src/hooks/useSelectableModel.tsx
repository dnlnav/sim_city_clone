import { useGLTF } from "@react-three/drei";
import { map } from "ramda";
import { useEffect, useMemo } from "react";
import { Color, type Mesh, type MeshStandardMaterial } from "three";

type GLTFResult = {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

export const useSelectableModel = <T extends GLTFResult>(
  url: string,
  isSelected: boolean,
): T => {
  const { nodes, materials } = useGLTF(url);

  const selectableMaterials = useMemo(
    () =>
      map(
        (material) => {
          const newMaterial = material.clone();
          if (isSelected) {
            newMaterial.emissive = new Color(0xffffff);
            newMaterial.emissiveIntensity = 0.05;
          }
          return newMaterial;
        },
        materials as GLTFResult["materials"],
      ),
    [materials, isSelected],
  );

  useEffect(
    () => () =>
      Object.values(selectableMaterials).forEach((material) =>
        material.dispose(),
      ),
    [selectableMaterials],
  );

  return {
    nodes: nodes,
    materials: selectableMaterials,
  } as T;
};
