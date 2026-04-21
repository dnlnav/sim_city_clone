import { type BuildingType } from "../../../utils/constants";

export type BuildingProps = {
  [Key in BuildingType]: {
    id: Key;
    name: string;
    color: string;
    heightProps: {
      initial: number;
      growthRate: number;
      maxRange: [number, number];
      max?: number;
    };
    residentsPerStory?: { initial: number; growthRate: number; max: number };
  };
};

export const DEFAULT_BUILDING_DATA: BuildingProps = {
  residential: {
    id: "residential",
    name: "RESIDENTIAL",
    color: "blue",
    heightProps: { initial: 1, growthRate: 1, maxRange: [3, 5] },
    residentsPerStory: { initial: 0, growthRate: 0.2, max: 20 },
  },
  commercial: {
    id: "commercial",
    name: "COMMERCIAL",
    color: "green",
    heightProps: { initial: 1, growthRate: 1, maxRange: [1, 5] },
  },
  industrial: {
    id: "industrial",
    name: "INDUSTRIAL",
    color: "lightgray",
    heightProps: { initial: 1, growthRate: 1, maxRange: [3, 5] },
  },
  mixed: {
    id: "mixed",
    name: "MIXED",
    color: "#9D6C3C",
    heightProps: { initial: 2, growthRate: 1, maxRange: [4, 6] },
    residentsPerStory: { initial: 0, growthRate: 0.2, max: 20 },
  },
} as const;

export type BuildingData = BuildingProps[BuildingType];
