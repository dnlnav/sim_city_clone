import { useState, type ReactNode } from "react";
import { ActionsContext, type ActionType } from "./context";

export function ActionsProvider({ children }: { children: ReactNode }) {
  const [currentAction, setCurrentAction] = useState<ActionType>("select");

  return (
    <ActionsContext value={{ currentAction, setCurrentAction }}>
      {children}
    </ActionsContext>
  );
}
