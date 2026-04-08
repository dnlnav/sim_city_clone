import { useEffect, useRef, useState } from "react";

type Building = {
  type: "building";
  height: number;
};

type TileData = {
  id: string;
  x: number;
  y: number;
  building: Building | undefined;
};

type CityData = TileData[][];

const initializeCityData = (size: number) => {
  const initialValue = -Math.floor(size / 2);
  const maxValue = Math.ceil(size / 2);
  const data: CityData = [];
  for (let x = initialValue; x < maxValue; x++) {
    const column: TileData[] = [];
    for (let y = initialValue; y < maxValue; y++) {
      column.push({
        id: `${x}-${y}`,
        x,
        y,
        building: undefined,
      });
    }
    data.push(column);
  }
  return data;
};

const updateTile = (tile: TileData): TileData => {
  let updatedBuilding: Building | undefined;

  switch (true) {
    case !tile.building:
      updatedBuilding = { type: "building", height: 1 };
      break;
    case tile.building!.type === "building" && tile.building!.height < 3:
      updatedBuilding = { type: "building", height: tile.building.height + 1 };
      break;
    default:
      updatedBuilding = tile.building;
      break;
  }

  return {
    ...tile,
    building: updatedBuilding,
  };
};

const updateCityData = (cityData: CityData) => {
  return cityData.map((column) =>
    column.map((tile) => {
      if (Math.random() > 0.01) return tile;
      return updateTile(tile);
    }),
  );
};

export const useCityData = (size: number) => {
  const [cityData, setCityData] = useState<CityData>(() =>
    initializeCityData(size),
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCityData(updateCityData);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cityData]);

  return cityData;
};
