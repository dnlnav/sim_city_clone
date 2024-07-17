import { range } from 'ramda';

type tileType = { x: number; y: number };
export type cityType = { size: number; data: tileType[][] };

export const createCity = (size: number): cityType => {
	const data = range(0, size).map((columnNumber) =>
		range(0, size).map((rowNumber) => ({ x: columnNumber, y: rowNumber }))
	);

	return { size, data };
};
