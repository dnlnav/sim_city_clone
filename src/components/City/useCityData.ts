import { useState } from "react";
import { assoc, dissoc } from "ramda";
import type { TileKey } from "../../utils/types";
import {
  BUILDING_TYPES,
  type BuildingType,
  type ConstructionType,
} from "../../utils/constants";

type CityData = Record<TileKey, ConstructionType>;

export const isBuilding = (
  contructionType: ConstructionType,
): contructionType is BuildingType => contructionType in BUILDING_TYPES;

export const useCityData = (size: number) => {
  const [cityData, setCityData] = useState<CityData>({});

  const addConstruction = (
    x: number,
    y: number,
    constructionType: ConstructionType,
  ) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData(assoc(`${x},${y}`, constructionType));
  };

  const removeConstruction = (x: number, y: number) => {
    if (x < 0 || x >= size || y < 0 || y >= size)
      throw new Error(`Invalid position ${x},${y}`);

    setCityData(dissoc(`${x},${y}`));
  };

  return { cityData, addConstruction, removeConstruction };
};
