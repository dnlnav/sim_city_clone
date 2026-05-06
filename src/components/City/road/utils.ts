import type { TilePosition } from "../../../utils/types";
import { isStreet, type CityData } from "../useCityData";

const roadTypeAndRotationList = {
  "top-right-bottom-left": { type: "crossroad", rotation: 0 },
  "top-right-bottom": { type: "intersection", rotation: 0 },
  "top-bottom-left": { type: "intersection", rotation: Math.PI / 2 },
  "right-bottom-left": { type: "intersection", rotation: Math.PI },
  "top-right-left": { type: "intersection", rotation: (Math.PI * 3) / 2 },
  "top-right": { type: "edge", rotation: 0 },
  "top-left": { type: "edge", rotation: Math.PI / 2 },
  "bottom-left": { type: "edge", rotation: Math.PI },
  "right-bottom": { type: "edge", rotation: (Math.PI * 3) / 2 },
  "top-bottom": { type: "straight", rotation: Math.PI / 2 },
  "right-left": { type: "straight", rotation: 0 },
  top: { type: "straight", rotation: Math.PI / 2 },
  right: { type: "straight", rotation: 0 },
  bottom: { type: "straight", rotation: Math.PI / 2 },
  left: { type: "straight", rotation: 0 },
} as const;

export const getRoadTypeAndRotation = (
  { x, y }: TilePosition,
  cityData: CityData,
) => {
  const neighbors = [];

  if (isStreet(cityData[`${x},${y + 1}`])) neighbors.push("top");
  if (isStreet(cityData[`${x - 1},${y}`])) neighbors.push("right");
  if (isStreet(cityData[`${x},${y - 1}`])) neighbors.push("bottom");
  if (isStreet(cityData[`${x + 1},${y}`])) neighbors.push("left");

  const neighborsKey = neighbors.join(
    "-",
  ) as keyof typeof roadTypeAndRotationList;

  return neighborsKey in roadTypeAndRotationList
    ? roadTypeAndRotationList[neighborsKey]
    : roadTypeAndRotationList.left;
};
