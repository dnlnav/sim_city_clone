import { useEffect, useRef } from "react";
import type { Mesh } from "three";
import type { TilePosition } from "../../../utils/types";
import type { BuildingType } from "../../../utils/constants";
import { useBuildingState } from "./state";

type BuildingProps = {
  buildingType: BuildingType;
  isSelected: boolean;
  position: TilePosition;
  onClick: ({ height }: { height: number }) => void;
};

export default function Building({
  buildingType,
  isSelected,
  position: { x, y },
  onClick,
}: BuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const { color, height, updateBuildingHeight } =
    useBuildingState(buildingType);

  useEffect(() => {
    const interval = setInterval(() => {
      updateBuildingHeight();
    }, 3000);
    return () => clearInterval(interval);
  }, [updateBuildingHeight]);

  return (
    <mesh
      ref={meshRef}
      position={[x + 0.5, height / 2, y - 0.5]}
      onClick={(e) => {
        e.stopPropagation();
        onClick({ height });
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial
        color={color}
        {...(isSelected ? { emissive: "white", emissiveIntensity: 0.05 } : {})}
      />
    </mesh>
  );
}
