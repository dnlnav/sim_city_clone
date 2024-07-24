import { range } from 'ramda';

export const BUILDING_STATES = {
	building_1: 'building_1',
	building_2: 'building_2',
	building_3: 'building_3'
} as const;

type buildingValue = (typeof BUILDING_STATES)[keyof typeof BUILDING_STATES];

type tileType = {
	x: number;
	y: number;
	building: buildingValue | null;
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
					building: null
				})
			)
		)
	);

	const update = () => {
		data = updateTiles(data, (tile): tileType => {
			if (Math.random() > 0.01) return tile;

			switch (tile.building) {
				case null:
					return { ...tile, building: BUILDING_STATES.building_1 };
				case BUILDING_STATES.building_1:
					return { ...tile, building: BUILDING_STATES.building_2 };
				case BUILDING_STATES.building_2:
					return { ...tile, building: BUILDING_STATES.building_3 };
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
