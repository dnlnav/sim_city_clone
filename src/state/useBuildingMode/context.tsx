import { createContext, use, type Dispatch, type SetStateAction } from "react";
import {
  type BuildingType,
  type GeneralAction,
  type RoadType,
} from "../../utils/constants";

export type ActionType = BuildingType | RoadType | GeneralAction;

type ActionDataType<T extends ActionType> = {
  [key in T]: {
    id: key;
    name: string;
  };
};

export const generalActions: ActionDataType<GeneralAction> = {
  resume: { id: "resume", name: "RESUME" },
  pause: { id: "pause", name: "PAUSE" },
  select: { id: "select", name: "SELECT" },
  bulldoze: { id: "bulldoze", name: "BULLDOZE" },
};

export const newBuildingActions: ActionDataType<BuildingType> = {
  residential: {
    id: "residential",
    name: "RESIDENTIAL",
  },
  commercial: {
    id: "commercial",
    name: "COMMERCIAL",
  },
  industrial: {
    id: "industrial",
    name: "INDUSTRIAL",
  },
  mixed: { id: "mixed", name: "MIXED" },
};

export const newRoadActions: ActionDataType<RoadType> = {
  street: { id: "street", name: "STREET" },
  cycleway: { id: "cycleway", name: "CYCLEWAY" },
  footway: { id: "footway", name: "FOOTWAY" },
};

export const ActionsContext = createContext<
  | {
      currentAction: ActionType;
      setCurrentAction: Dispatch<SetStateAction<ActionType>>;
    }
  | undefined
>(undefined);

export function useActions() {
  const context = use(ActionsContext);
  if (context === undefined) {
    throw new Error("useActions must be used within a ActionsContext");
  }
  return context;
}
