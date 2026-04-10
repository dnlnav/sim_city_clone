import { createContext, use } from "react";
import type { buildingModes } from "../../utils/assets";

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
