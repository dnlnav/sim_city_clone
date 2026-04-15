import { useRef } from "react";
import type { Mesh } from "three";
import type { TilePosition } from "../../../utils/types";
import { type ConstructionDataType } from "./const";

type BuildingProps = {
  constructionData: ConstructionDataType;
  position: TilePosition;
  onClick: (e: React.MouseEvent<Element>) => void;
};

export default function Building({
  constructionData,
  position: { x, y },
  onClick,
}: BuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const { height, color } = constructionData;

  return (
    <mesh
      ref={meshRef}
      position={[x, height / 2, y]}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
