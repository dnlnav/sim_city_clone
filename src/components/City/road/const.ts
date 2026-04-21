import { type RoadType } from "../../../utils/constants";

export type RoadProps = {
  [Key in RoadType]: {
    id: Key;
    name: string;
    color: string;
    height: number;
  };
};

export const DEFAULT_ROAD_DATA: RoadProps = {
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

export type RoadData = RoadProps[RoadType];
