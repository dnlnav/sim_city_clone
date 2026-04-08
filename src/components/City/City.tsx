import { Fragment, useState } from "react";
import Terrain from "../Terrain.tsx";
import Building from "../Building.tsx";
import { useCityData } from "./useCityData.ts";

const City = ({ cityLength }: { cityLength: number }) => {
  const cityData = useCityData(cityLength);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);

  const getOnClickTile = (tileId: string) => {
    return (e: React.MouseEvent<Element>) => {
      e.stopPropagation();
      setSelectedTileId(tileId);
    };
  };

  return (
    <>
      {cityData.map((column) =>
        column.map((tile) => (
          <Fragment key={tile.id}>
            <Terrain
              type="grass"
              position={{ x: tile.x, y: tile.y }}
              onClick={getOnClickTile(tile.id)}
              isSelected={selectedTileId === tile.id}
            />
            {tile.building && (
              <Building
                position={{ x: tile.x, y: tile.y }}
                height={tile.building.height}
                onClick={getOnClickTile(tile.id)}
                isSelected={selectedTileId === tile.id}
              />
            )}
          </Fragment>
        )),
      )}
    </>
  );
};

export default City;
