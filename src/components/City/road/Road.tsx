import { useRef } from "react";
import type { Mesh } from "three";
import type { TilePosition } from "../../../utils/types";
import type { RoadType } from "../../../utils/constants";
import { DEFAULT_ROAD_DATA } from "./const";

type RoadProps = {
  roadType: RoadType;
  isSelected: boolean;
  position: TilePosition;
  onClick: () => void;
};

export default function Road({
  roadType,
  isSelected,
  position: { x, y },
  onClick,
}: RoadProps) {
  const meshRef = useRef<Mesh>(null);
  const { color, height } = DEFAULT_ROAD_DATA[roadType];

  return (
    <mesh
      ref={meshRef}
      position={[x, height / 2, y]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
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
