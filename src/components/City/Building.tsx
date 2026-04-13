import { useRef } from "react";
import type { Mesh } from "three";
import type { TilePosition } from "../../utils/types";
import { type buildingDataType } from "../../state/useCityData/assets";

type BuildingProps = {
  buildingData: buildingDataType;
  position: TilePosition;
  onClick: (e: React.MouseEvent<Element>) => void;
};

export default function Building({
  buildingData,
  position: { x, y },
  onClick,
}: BuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const { height, color } = buildingData;

  return (
    <mesh ref={meshRef} position={[x, height / 2, y]} onClick={onClick}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
