import {
  buildingModes,
  useBuildingMode,
} from "../../state/useBuildingMode/context";

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
  const { buildingMode, setBuildingMode } = useBuildingMode();

  return (
    <div
      id="toolbar-container"
      className="absolute top-0 left-0 z-10 flex h-screen w-42 flex-col items-center gap-2 bg-gray-200 p-4"
    >
      {Object.entries(buildingModes).map(([key, { name }]) => (
        <ToolbarButton
          key={key}
          selected={buildingMode === key}
          onClick={() => setBuildingMode(key)}
        >
          {name}
        </ToolbarButton>
      ))}
    </div>
  );
};

export default Toolbar;
