import { createContext, use } from "react";
import { initialBuildingData, type buildingType } from "../useCityData/assets";

export type buildingModeType = buildingType | "bulldoze";

const {
  residential,
  commercial,
  industrial,
  mixed,
  street,
  cycleway,
  footway,
} = initialBuildingData;

export const buildingModes: Record<
  buildingModeType,
  { id: string; name: string }
> = {
  residential,
  commercial,
  industrial,
  mixed,
  street,
  cycleway,
  footway,
  bulldoze: { id: "bulldoze", name: "BULLDOZE" },
};

export type BuildingModeKey =
  (typeof buildingModes)[keyof typeof buildingModes]["id"];

type BuildingModeContextType = {
  buildingMode: BuildingModeKey;
  setBuildingMode: (buildingMode: BuildingModeKey) => void;
};

export const BuildingModeContext = createContext<
  BuildingModeContextType | undefined
>(undefined);

export function useBuildingMode() {
  const context = use(BuildingModeContext);
  if (context === undefined) {
    throw new Error(
      "useBuildingMode must be used within a BuildingModeProvider",
    );
  }
  return context;
}
