import { assocPath } from 'ramda';
import type { AssetType } from './assets';
import type { TileType } from './city.svelte';

export type BuildingValue = Exclude<AssetType, 'grass'>;
export type BuildingObject<T extends BuildingValue> = {
	id: T;
	height: number;
	update?: (tile: TileType, transformFunc?: (tile: TileType) => TileType) => TileType;
};

const updateFunc = (tile: TileType, transformFunc?: (tile: TileType) => TileType) => {
	const { height } = tile.building ?? {};
	if (!height) return tile;

	if (Math.random() > 0.01 || height >= 5) return tile;

	const updatedTile = assocPath(['building', 'height'], height + 1, tile);

	return transformFunc?.(updatedTile) ?? updatedTile;
};

const buildingFactory: { [K in BuildingValue]: () => BuildingObject<K> } = {
	residential: () => ({
		id: 'residential',
		height: 1,
		update: updateFunc
	}),
	commercial: () => ({
		id: 'commercial',
		height: 1,
		update: updateFunc
	}),
	industrial: () => ({
		id: 'industrial',
		height: 1,
		update: updateFunc
	}),
	road: () => ({
		id: 'road',
		height: 1
	})
};

export default buildingFactory;
