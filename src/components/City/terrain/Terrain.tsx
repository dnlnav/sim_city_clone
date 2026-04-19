import { useRef, useState } from "react";
import type { Mesh } from "three";
import type { TilePosition } from "../../../utils/types";

type TerrainType = "grass";
type TerrainProps = {
  position: TilePosition;
  type: TerrainType;
  onClick: (e: React.MouseEvent<Element>) => void;
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
}: TerrainProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const material = getTerrainMaterial(type, {
    ...(hovered ? { emissive: "white", emissiveIntensity: 0.05 } : {}),
  });

  if (!material) return null;

  return (
    <mesh
      ref={meshRef}
      position={[x, -0.5, y]}
      onClick={onClick}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      {material}
    </mesh>
  );
}
