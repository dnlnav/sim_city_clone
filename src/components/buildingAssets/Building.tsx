import { useRef } from "react";
import type { Mesh } from "three";
import type { TitePosition } from "../../utils/types";
import { buildingTypeList, type buildingType } from "../../utils/assets";

type BuildingProps = {
  type: buildingType;
  position: TitePosition;
  onClick: (e: React.MouseEvent<Element>) => void;
};

export default function Building({
  type,
  position: { x, y },
  onClick,
}: BuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const { initialHeight, color } = buildingTypeList[type];

  return (
    <mesh ref={meshRef} position={[x, initialHeight / 2, y]} onClick={onClick}>
      <boxGeometry args={[1, initialHeight, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
