import { useRef } from "react";
import type { Mesh } from "three";
import type { TitePosition } from "../utils/types";

type TerrainType = "grass";
type TerrainProps = {
  position: TitePosition;
  type: TerrainType;
  onClick: (e: React.MouseEvent<Element>) => void;
  isSelected: boolean;
};

type MaterialProps = {
  emissive?: string;
  emissiveIntensity?: number;
};

const getTerrainMaterial = (type: TerrainType, props: MaterialProps) => {
  if (type !== "grass") return null;
  return <meshStandardMaterial color="#32CD32" {...props} />;
};

export default function Terrain({
  position: { x, y },
  type,
  onClick,
  isSelected,
}: TerrainProps) {
  const meshRef = useRef<Mesh>(null);

  const material = getTerrainMaterial(type, {
    emissive: "#555555",
    emissiveIntensity: isSelected ? 1 : 0,
  });

  if (!material) return null;

  return (
    <mesh ref={meshRef} position={[x, -0.5, y]} onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      {material}
    </mesh>
  );
}
