export const initialBuildingData = {
  residential: {
    id: "residential",
    name: "RESIDENTIAL",
    color: "blue",
    height: 1,
    heightProps: { growth: 1, max: 5 },
  },
  commercial: {
    id: "commercial",
    name: "COMMERCIAL",
    color: "green",
    height: 1,
    heightProps: { growth: 1, max: 5 },
  },
  industrial: {
    id: "industrial",
    name: "INDUSTRIAL",
    color: "lightgray",
    height: 1,
    heightProps: { growth: 1, max: 5 },
  },
  mixed: {
    id: "mixed",
    name: "MIXED",
    color: "#9D6C3C",
    height: 2,
    heightProps: { growth: 1, max: 6 },
  },
  street: {
    id: "street",
    name: "STREET",
    color: "darkgray",
    height: 0.1,
    heightProps: { growth: 0, max: 0.1 },
  },
  cycleway: {
    id: "cycleway",
    name: "CYCLEWAY",
    color: "#CA6641",
    height: 0.1,
    heightProps: { growth: 0, max: 0.1 },
  },
  footway: {
    id: "footway",
    name: "FOOTWAY",
    color: "#fff8e7",
    height: 0.1,
    heightProps: { growth: 0, max: 0.1 },
  },
} as const;

export type buildingType = keyof typeof initialBuildingData;
export type buildingDataType = (typeof initialBuildingData)[buildingType];
