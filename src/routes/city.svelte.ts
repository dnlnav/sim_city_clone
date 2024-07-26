import { map, range } from 'ramda';
import { ASSETS_IDS, type AssetType } from './assets';

export type buildingValue = Exclude<AssetType, 'grass'>;
export type terrainValue = Extract<AssetType, 'grass'>;

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
	let data = $state(
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

	const update = () => {
		data = updateTiles(data, (tile): tileType => {
			if (Math.random() > 0.01) return tile;

			switch (tile.buildingId) {
				case null:
					return { ...tile, buildingId: ASSETS_IDS.building_1 };
				case ASSETS_IDS.building_1:
					return { ...tile, buildingId: ASSETS_IDS.building_2 };
				case ASSETS_IDS.building_2:
					return { ...tile, buildingId: ASSETS_IDS.building_3 };
				default:
					return tile;
			}
		});
	};

	return {
		get data() {
			return data;
		},
		update
	};
};
