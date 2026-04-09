import { useState } from "react";

const buttons = {
  bulldoze: "BULLDOZE",
  street: "STREET",
  cycleway: "CYCLEWAY",
  footway: "FOOTWAY",
  residential: "RESIDENTIAL",
  commercial: "COMMERCIAL",
  industrial: "INDUSTRIAL",
} as const;

type ToolbarButtonKey = keyof typeof buttons;

type ToolbarButtonProps = {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

const ToolbarButton = ({ children, selected, onClick }: ToolbarButtonProps) => {
  return (
    <button
      className={`h-12 w-30 rounded-md border border-gray-300 ${selected ? "bg-blue-300" : "bg-white"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Toolbar = () => {
  const [selectedTool, setSelectedTool] =
    useState<ToolbarButtonKey>("bulldoze");

  return (
    <div
      id="toolbar-container"
      className="absolute top-0 left-0 z-10 flex h-screen w-42 flex-col items-center gap-2 bg-gray-200 p-4"
    >
      {Object.entries(buttons).map(([key, value]) => (
        <ToolbarButton
          key={key}
          selected={selectedTool === key}
          onClick={() => setSelectedTool(key as ToolbarButtonKey)}
        >
          {value}
        </ToolbarButton>
      ))}
    </div>
  );
};

export default Toolbar;
