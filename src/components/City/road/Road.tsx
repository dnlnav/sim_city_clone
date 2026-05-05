import { useRef } from "react";
import type { Mesh } from "three";
import type { TilePosition } from "../../../utils/types";
import type { RoadType } from "../../../utils/constants";
import { DEFAULT_ROAD_DATA } from "./const";
import { Resize } from "@react-three/drei";
import RoadStraight from "../../../models/RoadStraight";
import RoadBend from "../../../models/RoadBend";
import RoadCrossroadPath from "../../../models/RoadCrossroadPath";
import RoadIntersectionPath from "../../../models/RoadIntersectionPath";

type RoadProps = {
  roadType: RoadType;
  isSelected: boolean;
  position: TilePosition;
  onClick: () => void;
};

const getRoadModel = (onClick: () => void, isSelected: boolean) => {
  const randomInt = Math.floor(Math.random() * 4) + 1;
  switch (randomInt) {
    case 1:
      return (
        <RoadBend
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          isSelected={isSelected}
        />
      );
    case 2:
      return (
        <RoadCrossroadPath
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          isSelected={isSelected}
        />
      );
    case 3:
      return (
        <RoadIntersectionPath
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          isSelected={isSelected}
        />
      );
    default:
      return (
        <RoadStraight
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          isSelected={isSelected}
        />
      );
  }
};

export default function Road({
  roadType,
  isSelected,
  position: { x, y },
  onClick,
}: RoadProps) {
  const meshRef = useRef<Mesh>(null);
  const { color, height } = DEFAULT_ROAD_DATA[roadType];

  if (roadType === "street") {
    return (
      <>
        <group position={[x, 0, y]}>
          <Resize width depth height>
            {getRoadModel(onClick, isSelected)}
          </Resize>
        </group>
      </>
    );
  }

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
