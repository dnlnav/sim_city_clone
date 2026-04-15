import {
  generalActions,
  newBuildingActions,
  newRoadActions,
  useActions,
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
  const { currentAction, setCurrentAction } = useActions();

  return (
    <div
      id="toolbar-container"
      className="absolute top-0 left-0 z-10 flex h-screen w-42 flex-col items-center gap-2 bg-gray-200 p-4"
    >
      <div>
        {Object.values(generalActions).map(({ id, name }) => (
          <ToolbarButton
            key={id}
            selected={currentAction === id}
            onClick={() => setCurrentAction(id)}
          >
            {name}
          </ToolbarButton>
        ))}
      </div>
      <div>
        {Object.values(newBuildingActions).map(({ id, name }) => (
          <ToolbarButton
            key={id}
            selected={currentAction === id}
            onClick={() => setCurrentAction(id)}
          >
            {name}
          </ToolbarButton>
        ))}
      </div>
      <div>
        {Object.values(newRoadActions).map(({ id, name }) => (
          <ToolbarButton
            key={id}
            selected={currentAction === id}
            onClick={() => setCurrentAction(id)}
          >
            {name}
          </ToolbarButton>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
