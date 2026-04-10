import { Fragment } from "react";
import Terrain from "../buildingAssets/Terrain.tsx";
import Building from "../buildingAssets/Building.tsx";
import { useCityData } from "./useCityData.ts";
import { range } from "ramda";
import type { buildingType } from "../../utils/assets.ts";
import { useBuildingMode } from "../../contexts/buildingMode/BuildingModeContext.tsx";

const City = ({ cityLength }: { cityLength: number }) => {
  const { cityData, addBuilding, removeBuilding } = useCityData(cityLength);
  const { buildingMode } = useBuildingMode();

  const getBuilding = (x: number, y: number) => {
    if (!cityData[`${x},${y}`]) return null;
    const buildingType = cityData[`${x},${y}`];
    return (
      <Building
        type={buildingType}
        position={{ x, y }}
        onClick={(e) => {
          e.stopPropagation();
          if (buildingMode !== "bulldoze") return;
          removeBuilding(x, y);
        }}
      />
    );
  };

  return (
    <>
      {range(0, cityLength).map((column) =>
        range(0, cityLength).map((row) => (
          <Fragment key={`${column}-${row}`}>
            <Terrain
              type="grass"
              position={{ x: column, y: row }}
              onClick={(e) => {
                e.stopPropagation();
                if (buildingMode === "bulldoze") return;
                addBuilding(column, row, buildingMode as buildingType);
              }}
            />
            {getBuilding(column, row)}
          </Fragment>
        )),
      )}
    </>
  );
};

export default City;
