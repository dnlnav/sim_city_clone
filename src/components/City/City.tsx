import { Fragment } from "react";
import Terrain from "./Terrain.tsx";
import Building from "./Building.tsx";
import { useCityData } from "../../state/useCityData/hooks.ts";
import { range } from "ramda";
import type { buildingType } from "../../state/useCityData/assets.ts";
import { useBuildingMode } from "../../state/useBuildingMode/context.tsx";

const City = ({ cityLength }: { cityLength: number }) => {
  const { cityData, addBuilding, removeBuilding } = useCityData(cityLength);
  const { buildingMode } = useBuildingMode();

  const getBuilding = (x: number, y: number) => {
    if (!cityData[`${x},${y}`]) return null;
    const buildingData = cityData[`${x},${y}`];
    return (
      <Building
        buildingData={buildingData}
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
