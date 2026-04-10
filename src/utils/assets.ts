export const buildingTypeList = {
  street: {
    id: "street",
    name: "STREET",
    color: "darkgray",
    initialHeight: 0.1,
  },
  cycleway: {
    id: "cycleway",
    name: "CYCLEWAY",
    color: "#CA6641",
    initialHeight: 0.1,
  },
  footway: {
    id: "footway",
    name: "FOOTWAY",
    color: "#fff8e7",
    initialHeight: 0.1,
  },
  residential: {
    id: "residential",
    name: "RESIDENTIAL",
    color: "darkblue",
    initialHeight: 0.1,
  },
  commercial: {
    id: "commercial",
    name: "COMMERCIAL",
    color: "darkgreen",
    initialHeight: 0.1,
  },
  industrial: {
    id: "industrial",
    name: "INDUSTRIAL",
    color: "lightgray",
    initialHeight: 0.1,
  },
  mixed: { id: "mixed", name: "MIXED", color: "#9D6C3C", initialHeight: 2 },
} as const;

export type buildingType = keyof typeof buildingTypeList;
export type buildingProps = (typeof buildingTypeList)[buildingType];

export type buildingModeType = buildingType | "bulldoze";

export const buildingModes: Record<
  buildingModeType,
  { id: string; name: string }
> = {
  bulldoze: { id: "bulldoze", name: "BULLDOZE" },
  ...buildingTypeList,
};
