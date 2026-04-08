import { useRef } from "react";
import type { Mesh } from "three";
import type { TitePosition } from "../utils/types";

type BuildingProps = {
  position: TitePosition;
  height: number;
  onClick: (e: React.MouseEvent<Element>) => void;
  isSelected: boolean;
};

const BRICK_COLOR = "#CA6641";

export default function Building({
  position: { x, y },
  height,
  onClick,
  isSelected,
}: BuildingProps) {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} position={[x, height / 2, y]} onClick={onClick}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial
        color={BRICK_COLOR}
        roughness={0.9}
        metalness={0.0}
        emissive={"#555555"}
        emissiveIntensity={isSelected ? 1 : 0}
      />
    </mesh>
  );
}
