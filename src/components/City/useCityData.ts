import { useState } from "react";
import type { buildingType } from "../../utils/assets";
import { dissoc } from "ramda";

type CityData = Record<`${number},${number}`, buildingType>;

export const useCityData = (size: number) => {
  const [cityData, setCityData] = useState<CityData>({});

  const addBuilding = (x: number, y: number, buildingType: buildingType) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData((prev) => ({
      ...prev,
      [`${x},${y}`]: buildingType,
    }));
  };

  const removeBuilding = (x: number, y: number) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData(dissoc(`${x},${y}`));
  };

  return { cityData, addBuilding, removeBuilding };
};
