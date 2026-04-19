import {
  generalActions,
  newBuildingActions,
  newRoadActions,
  useActions,
} from "../../state/useActions.tsx";
import ToolbarButton from "./ToolbarButton.tsx";

const Divider = () => (
  <hr className="my-2 w-10 rounded border-2 border-slate-600" />
);

const Toolbar = () => {
  const { currentAction, setCurrentAction, gamePaused, setGamePaused } =
    useActions();

  return (
    <div
      id="toolbar-container"
      className="absolute top-0 left-0 z-10 flex h-screen w-20 flex-col items-center gap-1 border-r-4 border-slate-900 bg-slate-800 py-4 shadow-inner"
    >
      <div className="flex flex-col items-center gap-2">
        {Object.values(generalActions).map(
          ({ id, name, icon, color, onClick = () => setCurrentAction(id), hide }) => (
            <ToolbarButton
              key={id}
              label={name}
              icon={icon}
              color={color}
              selected={currentAction === id}
              onClick={() => onClick?.({ gamePaused, setGamePaused })}
              hide={hide?.({ gamePaused, setGamePaused })}
            />
          ),
        )}
      </div>

      <Divider />

      <div className="flex flex-col items-center gap-2">
        {Object.values(newBuildingActions).map(({ id, name, icon, color }) => (
          <ToolbarButton
            key={id}
            label={name}
            icon={icon}
            color={color}
            selected={currentAction === id}
            onClick={() => setCurrentAction(id)}
          />
        ))}
      </div>

      <Divider />

      <div className="flex flex-col items-center gap-2">
        {Object.values(newRoadActions).map(({ id, name, icon, color }) => (
          <ToolbarButton
            key={id}
            label={name}
            icon={icon}
            color={color}
            selected={currentAction === id}
            onClick={() => setCurrentAction(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
