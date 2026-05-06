import { Fragment } from "react";
import Terrain from "./terrain/Terrain.tsx";
import Building from "./building/Building.tsx";
import { isBuilding, useCityData, type CityData } from "./useCityData.ts";
import { range } from "ramda";
import { useActions, type ActionType } from "../../state/useActions.tsx";
import {
  BUILDING_TYPES,
  ROAD_TYPES,
  type ConstructionType,
} from "../../utils/constants.ts";
import type { TileKey } from "../../utils/types.ts";
import Road from "./road/Road.tsx";

const isConstructionAction = (action: ActionType): action is ConstructionType =>
  action in BUILDING_TYPES || action in ROAD_TYPES;

const City = ({ cityLength }: { cityLength: number }) => {
  const { cityData, addConstruction, removeConstruction } =
    useCityData(cityLength);
  const { currentAction, selectedTile, setSelectedTile } = useActions();

  const getConstruction = (
    tileKey: TileKey,
    contructionType: ConstructionType,
    cityData: CityData,
  ) => {
    const [x, y] = tileKey.split(",").map(Number);

    if (isBuilding(contructionType)) {
      return (
        <Building
          key={tileKey}
          buildingType={contructionType}
          position={{ x, y }}
          isSelected={
            currentAction === "select" && selectedTile?.position === tileKey
          }
          onClick={({ height }) => {
            if (currentAction === "select") {
              setSelectedTile({
                position: tileKey,
                type: contructionType,
                height,
              });
            }
            if (currentAction !== "bulldoze") return;
            removeConstruction(x, y);
          }}
        />
      );
    }

    return (
      <Road
        key={tileKey}
        roadType={contructionType}
        position={{ x, y }}
        isSelected={
          currentAction === "select" && selectedTile?.position === tileKey
        }
        cityData={cityData}
        onClick={() => {
          if (currentAction === "select") {
            setSelectedTile({ position: tileKey, type: contructionType });
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
          <Terrain
            key={`${column}-${row}-terrain`}
            type="grass"
            position={{ x: column, y: row }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isConstructionAction(currentAction)) return;
              addConstruction(column, row, currentAction);
            }}
          />
        )),
      )}
      {Object.entries(cityData).map(([key, value]) => (
        <Fragment key={`${key}-construction`}>
          {getConstruction(key as TileKey, value, cityData)}
        </Fragment>
      ))}
    </>
  );
};

export default City;
