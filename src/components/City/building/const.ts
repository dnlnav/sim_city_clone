import { type BuildingType, type RoadType } from "../../../utils/constants";

type DefaultBuildingDataType = {
  [key in BuildingType]: {
    id: key;
    name: string;
    color: string;
    height: number;
    heightProps: { growth: number; max: number };
  };
};

export const DEFAULT_BUILDING_DATA: DefaultBuildingDataType = {
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
} as const;

type DefaultRoadDataType = {
  [key in RoadType]: {
    id: key;
    name: string;
    color: string;
    height: number;
  };
};

export const DEFAULT_ROAD_DATA: DefaultRoadDataType = {
  street: {
    id: "street",
    name: "STREET",
    color: "darkgray",
    height: 0.1,
  },
  // cycleway: {
  //   id: "cycleway",
  //   name: "CYCLEWAY",
  //   color: "#CA6641",
  //   height: 0.1,
  // },
  footway: {
    id: "footway",
    name: "FOOTWAY",
    color: "#fff8e7",
    height: 0.1,
  },
} as const;

export const DEFAULT_CONSTRUCTION_DATA = {
  ...DEFAULT_BUILDING_DATA,
  ...DEFAULT_ROAD_DATA,
} as const;

export type BuildingDataType = DefaultBuildingDataType[BuildingType];
export type RoadDataType = DefaultRoadDataType[RoadType];
export type ConstructionDataType = BuildingDataType | RoadDataType;
