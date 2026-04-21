import { create } from "zustand";
import type { LucideIcon } from "lucide-react";
import {
  Play,
  Pause,
  MousePointer2,
  Hammer,
  House,
  Store,
  Factory,
  Building2,
  Route,
  Footprints,
} from "lucide-react";
import {
  type BuildingType,
  type GeneralAction,
  type RoadType,
} from "../utils/constants";
import type { TileKey } from "../utils/types";

export type ActionType = BuildingType | RoadType | GeneralAction;

export type ColorKey =
  | "slate"
  | "emerald"
  | "sky"
  | "amber"
  | "violet"
  | "zinc"
  | "stone";

type ActionDataType<T extends ActionType> = {
  [key in T]: {
    id: key;
    name: string;
    icon: LucideIcon;
    color: ColorKey;
    onClick?: (args: Partial<ActionsState>) => void;
    hide?: (args: Partial<ActionsState>) => boolean;
  };
};

export const generalActions: ActionDataType<GeneralAction> = {
  resume: {
    id: "resume",
    name: "RESUME",
    icon: Play,
    color: "slate",
    onClick: ({ setGamePaused }) => {
      setGamePaused?.(false);
    },
    hide: ({ gamePaused }) => !gamePaused,
  },
  pause: {
    id: "pause",
    name: "PAUSE",
    icon: Pause,
    color: "slate",
    onClick: ({ setGamePaused }) => {
      setGamePaused?.(true);
    },
    hide: ({ gamePaused }) => !!gamePaused,
  },
  select: {
    id: "select",
    name: "SELECT",
    icon: MousePointer2,
    color: "slate",
  },
  bulldoze: {
    id: "bulldoze",
    name: "BULLDOZE",
    icon: Hammer,
    color: "slate",
  },
};

export const newBuildingActions: ActionDataType<BuildingType> = {
  residential: {
    id: "residential",
    name: "RESIDENTIAL",
    icon: House,
    color: "emerald",
  },
  commercial: {
    id: "commercial",
    name: "COMMERCIAL",
    icon: Store,
    color: "sky",
  },
  industrial: {
    id: "industrial",
    name: "INDUSTRIAL",
    icon: Factory,
    color: "amber",
  },
  mixed: {
    id: "mixed",
    name: "MIXED",
    icon: Building2,
    color: "violet",
  },
};

export const newRoadActions: ActionDataType<RoadType> = {
  street: {
    id: "street",
    name: "STREET",
    icon: Route,
    color: "zinc",
  },
  footway: {
    id: "footway",
    name: "FOOTWAY",
    icon: Footprints,
    color: "stone",
  },
};

type SelectedTile = {
  position: TileKey;
  type: BuildingType | RoadType;
  height?: number;
} | null;

type ActionsState = {
  currentAction: ActionType;
  setCurrentAction: (action: ActionType) => void;
  selectedTile: SelectedTile;
  setSelectedTile: (tile: SelectedTile) => void;
  gamePaused: boolean;
  setGamePaused: (paused: boolean) => void;
};

export const useActions = create<ActionsState>((set) => ({
  currentAction: "select",
  setCurrentAction: (action) => {
    set((state) => {
      const selectedTile =
        state.currentAction === "select" && state.currentAction !== action
          ? null
          : state.selectedTile;
      return { ...state, currentAction: action, selectedTile };
    });
  },
  selectedTile: null,
  setSelectedTile: (tile) => set({ selectedTile: tile }),
  gamePaused: false,
  setGamePaused: (paused) => set({ gamePaused: paused }),
}));
