import { map, range } from 'ramda';
import { type AssetType } from './assets';

export type buildingValue = Exclude<AssetType, ['grass', 'road']>;
export type terrainValue = Extract<AssetType, 'grass' | 'road'>;

export type tileType = {
	x: number;
	y: number;
	terrainId: terrainValue | null;
	buildingId: buildingValue | null;
};
export type cityType = tileType[][];

export const updateTiles = <T, K extends tileType>(
	tileArray: K[][],
	updateFunc: (x: K) => T
): T[][] => map(map(updateFunc), tileArray);

export const createCity = (size: number) => {
	const data = $state(
		range(0, size).map((columnNumber) =>
			range(0, size).map(
				(rowNumber): tileType => ({
					x: columnNumber,
					y: rowNumber,
					terrainId: 'grass',
					buildingId: null
				})
			)
		)
	);

	const update = () => {};

	const updateTile = (x: number, y: number, newObject: Partial<tileType>) => {
		data[x][y] = { ...data[x][y], ...newObject };
	};

	return {
		get data() {
			return data;
		},
		update,
		updateTile
	};
};
