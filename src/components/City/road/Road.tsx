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
import type { CityData } from "../useCityData";
import { getRoadTypeAndRotation } from "./utils";

type RoadProps = {
  roadType: RoadType;
  isSelected: boolean;
  position: TilePosition;
  onClick: () => void;
  cityData: CityData;
};

const RoadModelList = {
  straight: RoadStraight,
  edge: RoadBend,
  crossroad: RoadCrossroadPath,
  intersection: RoadIntersectionPath,
} as const;

const getRoadModel = ({
  onClick,
  isSelected,
  position,
  cityData,
}: {
  onClick: () => void;
  isSelected: boolean;
  position: TilePosition;
  cityData: CityData;
}) => {
  const { type, rotation } = getRoadTypeAndRotation(position, cityData);

  const RoadModel = RoadModelList[type];

  return (
    <RoadModel
      position={[0.5, 0.02, -0.5]}
      rotation={[0, rotation ?? 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      isSelected={isSelected}
    />
  );
};

export default function Road({
  roadType,
  isSelected,
  position,
  position: { x, y },
  cityData,
  onClick,
}: RoadProps) {
  const meshRef = useRef<Mesh>(null);
  const { color, height } = DEFAULT_ROAD_DATA[roadType];

  if (roadType === "street") {
    return (
      <>
        <group position={[x, 0, y]}>
          <Resize width depth height>
            {getRoadModel({ onClick, isSelected, position, cityData })}
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
