import { Fragment } from "react";
import Terrain from "./terrain/Terrain.tsx";
import Building from "./building/Building.tsx";
import { useCityData } from "./useCityData.ts";
import { range } from "ramda";
import { useActions } from "../../state/useActions.tsx";
import type { ConstructionType } from "../../utils/constants.ts";
import type { TileKey } from "../../utils/types.ts";

const City = ({ cityLength }: { cityLength: number }) => {
  const { cityData, addConstruction, removeConstruction } =
    useCityData(cityLength);
  const { currentAction, selectedTile, setSelectedTile } = useActions();

  const getBuilding = (x: number, y: number) => {
    const tileKey: TileKey = `${x},${y}`;
    if (!cityData[tileKey]) return null;
    const constructionData = cityData[tileKey];
    return (
      <Building
        constructionData={constructionData}
        position={{ x, y }}
        isSelected={currentAction === "select" && selectedTile === tileKey}
        onClick={(e) => {
          e.stopPropagation();
          if (currentAction === "select") {
            setSelectedTile(tileKey);
          }
          if (currentAction !== "bulldoze") return;
          removeConstruction(x, y);
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
                if (currentAction === "bulldoze") return;
                addConstruction(column, row, currentAction as ConstructionType);
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
