import { useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import City from "./components/City/City";
import { CameraControls } from "@react-three/drei";
import type { CameraControls as CameraControlsImpl } from "@react-three/drei";
import Toolbar from "./components/Toolbar/Toolbar";
import { BuildingModeProvider } from "./contexts/buildingMode/provider";

const CITY_LENGTH = 16;

export default function App() {
  const controlsRef = useCallback((controls: CameraControlsImpl | null) => {
    void controls?.setTarget(CITY_LENGTH / 2, 0, CITY_LENGTH / 2);
  }, []);

  return (
    <BuildingModeProvider>
      <div id="canvas-container" className="h-screen w-full">
        <Toolbar />
        <Canvas
          scene={{ background: new Color("skyblue") }}
          camera={{
            position: [-10, 20, -10],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <CameraControls ref={controlsRef} minDistance={10} maxDistance={30} />
          <City cityLength={CITY_LENGTH} />
          <ambientLight intensity={0.2} />
          <directionalLight intensity={0.3} position={[0, 1, 0]} />
          <directionalLight intensity={0.3} position={[1, 1, 0]} />
          <directionalLight intensity={0.3} position={[0, 1, 1]} />
        </Canvas>
      </div>
    </BuildingModeProvider>
  );
}
