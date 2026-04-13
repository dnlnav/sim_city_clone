import { useCallback, useEffect, useState } from "react";
import {
  type buildingType,
  type buildingDataType,
  initialBuildingData,
} from "./assets";
import { dissoc } from "ramda";
import type { TileKey } from "../../utils/types";

type CityData = Record<TileKey, buildingDataType>;

const shouldBuildingUpdate = () => Math.random() < 0.1;

export const useCityData = (size: number) => {
  const [cityData, setCityData] = useState<CityData>({});

  const updateBuildingHeight = useCallback(
    (key: TileKey) => {
      const buildingData = cityData[key];
      const newHeight = buildingData.height + buildingData.heightProps.growth;
      if (newHeight >= buildingData.heightProps.max) return;
      setCityData((prev) => ({
        ...prev,
        [key]: {
          ...buildingData,
          height: newHeight,
        },
      }));
    },
    [cityData],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      Object.keys(cityData).forEach((key) => {
        if (!shouldBuildingUpdate()) return;
        updateBuildingHeight(key as TileKey);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cityData, updateBuildingHeight]);

  const addBuilding = (x: number, y: number, buildingType: buildingType) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData((prev) => ({
      ...prev,
      [`${x},${y}`]: initialBuildingData[buildingType],
    }));
  };

  const removeBuilding = (x: number, y: number) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData(dissoc(`${x},${y}`));
  };

  return { cityData, addBuilding, removeBuilding };
};
