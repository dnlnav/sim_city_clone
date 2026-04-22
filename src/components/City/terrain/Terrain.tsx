import { useState } from "react";
import type { TilePosition } from "../../../utils/types";
import { Grass } from "../../../models/Grass";
import { Resize } from "@react-three/drei";

type TerrainType = "grass";
type TerrainProps = {
  position: TilePosition;
  type: TerrainType;
  onClick: (e: React.MouseEvent<Element>) => void;
};

export default function Terrain({ position: { x, y }, onClick }: TerrainProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[x, -0.5, y]} dispose={null}>
      <Resize width depth height>
        <Grass
          position={[-1.5, 1, 1.5]}
          onClick={onClick}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            setHovered(false);
          }}
          emissive={hovered ? "white" : undefined}
          emissiveIntensity={hovered ? 0.05 : 0}
        />
      </Resize>
    </group>
  );
}
