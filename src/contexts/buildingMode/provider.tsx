import { useState, type ReactNode } from "react";
import {
  BuildingModeContext,
  type BuildingModeKey,
} from "./BuildingModeContext";

export function BuildingModeProvider({ children }: { children: ReactNode }) {
  const [buildingMode, setBuildingMode] = useState<BuildingModeKey>("bulldoze");

  return (
    <BuildingModeContext value={{ buildingMode, setBuildingMode }}>
      {children}
    </BuildingModeContext>
  );
}
