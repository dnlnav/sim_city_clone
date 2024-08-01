import { map, range } from 'ramda';
import { type AssetType, type MeshType } from './assets';
import type { BuildingObject, BuildingValue } from './buildings';

export type TerrainValue = Extract<AssetType, 'grass'>;

export type TileType = {
	x: number;
	y: number;
	terrainId?: TerrainValue;
	building?: BuildingObject<BuildingValue>;
	buildingMesh?: MeshType;
};
export type cityType = TileType[][];

export const mapTiles = <T, K extends TileType>(tileArray: K[][], updateFunc: (x: K) => T): T[][] =>
	map(map(updateFunc), tileArray);

const createTile = (x: number, y: number): TileType => {
	return {
		x,
		y,
		terrainId: 'grass'
	};
};

export const createCity = (size: number) => {
	let data = $state(
		range(0, size).map((columnNumber) =>
			range(0, size).map((rowNumber) => createTile(columnNumber, rowNumber))
		)
	);

	const update = (transformFunc: (tile: TileType) => TileType) => {
		data = mapTiles(data, (tile) => tile.building?.update?.(tile, transformFunc) ?? tile);
	};

	const updateTile = (
		{ x, y }: { x: number; y: number },
		newObject: Partial<TileType>,
		transformFunc?: (tile: TileType) => TileType
	) => {
		const updatedTile = { ...data[x][y], ...newObject };
		data[x][y] = transformFunc?.(updatedTile) ?? updatedTile;
	};

	return {
		get data() {
			return data;
		},
		update,
		updateTile
	};
};
