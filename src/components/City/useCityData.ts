import { useCallback, useEffect, useState } from "react";
import { dissoc } from "ramda";
import type { TileKey } from "../../utils/types";
import { BUILDING_TYPES, type ConstructionType } from "../../utils/constants";
import {
  DEFAULT_CONSTRUCTION_DATA,
  type BuildingDataType,
  type ConstructionDataType,
} from "./building/const";

type CityData = Record<TileKey, ConstructionDataType>;

const shouldBuildingUpdate = () => Math.random() < 0.1;

const isBuilding = (
  constructionData: ConstructionDataType,
): constructionData is BuildingDataType =>
  constructionData.id in BUILDING_TYPES;

export const useCityData = (size: number) => {
  const [cityData, setCityData] = useState<CityData>({});

  const updateBuildingHeight = useCallback(
    (key: TileKey) => {
      const buildingData = cityData[key];
      if (!isBuilding(buildingData)) return;

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
    }, 3000);
    return () => clearInterval(interval);
  }, [cityData, updateBuildingHeight]);

  const addConstruction = (
    x: number,
    y: number,
    constructionType: ConstructionType,
  ) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData((prev) => ({
      ...prev,
      [`${x},${y}`]: DEFAULT_CONSTRUCTION_DATA[constructionType],
    }));
  };

  const removeConstruction = (x: number, y: number) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData(dissoc(`${x},${y}`));
  };

  return { cityData, addConstruction, removeConstruction };
};
