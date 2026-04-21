import { useState } from "react";
import type { BuildingType } from "../../../utils/constants";
import { DEFAULT_BUILDING_DATA } from "./const";
import { getRandomIntFromInterval } from "../../../utils/helpers";

const shouldBuildingUpdate = () => Math.random() < 0.1;

export const useBuildingState = (id: BuildingType) => {
  const { heightProps, color } = DEFAULT_BUILDING_DATA[id];

  const [height, setHeight] = useState(heightProps.initial);
  const [maxHeight] = useState(() =>
    getRandomIntFromInterval(...heightProps.maxRange),
  );

  const updateBuildingHeight = () => {
    if (!shouldBuildingUpdate()) return;

    const newHeight = height + heightProps.growthRate;
    if (newHeight >= maxHeight) return;

    setHeight(newHeight);
  };

  return { height, color, updateBuildingHeight };
};
