export const BUILDING_TYPES = {
  residential: "residential",
  commercial: "commercial",
  industrial: "industrial",
  mixed: "mixed",
} as const;
export type BuildingType = keyof typeof BUILDING_TYPES;

export const ROAD_TYPES = {
  street: "street",
  // cycleway: "cycleway",
  footway: "footway",
} as const;
export type RoadType = keyof typeof ROAD_TYPES;

export type ConstructionType = BuildingType | RoadType;

export const GENERAL_ACTIONS = {
  resume: "resume",
  pause: "pause",
  select: "select",
  bulldoze: "bulldoze",
} as const;
export type GeneralAction = keyof typeof GENERAL_ACTIONS;
