import { range } from 'ramda';

export const BUILDING_STATES = {
	none: 0,
	building_1: 1,
	building_2: 2,
	building_3: 3
} as const;

type buildingValue = (typeof BUILDING_STATES)[keyof typeof BUILDING_STATES];

type tileType = {
	x: number;
	y: number;
	building: buildingValue;
};
export type cityType = tileType[][];

const updateTiles = (
	tileArray: tileType[][],
	updateFunc: (x: tileType) => tileType
): tileType[][] => tileArray.map((x) => x.map(updateFunc));

export const createCity = (size: number) => {
	let data = $state(
		range(0, size).map((columnNumber) =>
			range(0, size).map(
				(rowNumber): tileType => ({
					x: columnNumber,
					y: rowNumber,
					building: BUILDING_STATES.none
				})
			)
		)
	);

	const update = () => {
		data = updateTiles(data, (tile): tileType => {
			const change = Math.random() < 0.01;
			return tile.building < BUILDING_STATES.building_3 && change
				? ({
						...tile,
						building: tile.building + 1
					} as tileType)
				: tile;
		});
	};

	return {
		get data() {
			return data;
		},
		update
	};
};
