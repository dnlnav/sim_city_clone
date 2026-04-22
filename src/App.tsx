import { Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import City from "./components/city/City";
import { CameraControls } from "@react-three/drei";
import type { CameraControls as CameraControlsImpl } from "@react-three/drei";
import InfoOverlay from "./components/info-overlay/InfoOverlay";
import Toolbar from "./components/toolbar/Toolbar";
import TitleBar from "./components/title-bar/TitleBar";

const CITY_LENGTH = 16;

export default function App() {
  const controlsRef = useCallback((controls: CameraControlsImpl | null) => {
    void controls?.setTarget(CITY_LENGTH / 2, 0, CITY_LENGTH / 2);
  }, []);

  return (
    <div id="canvas-container" className="h-screen w-full">
      <Toolbar />
      <TitleBar />
      <InfoOverlay />
      <Canvas
        shadows
        scene={{ background: new Color("skyblue") }}
        camera={{
          position: [-10, 20, -10],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <CameraControls
            ref={controlsRef}
            minDistance={10}
            maxDistance={30}
            mouseButtons={{ left: 0, right: 1, middle: 4, wheel: 32 }}
          />
          <City cityLength={CITY_LENGTH} />
          <ambientLight intensity={0.3} />
          <directionalLight
            intensity={1}
            position={[20, 20, 20]}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
            shadow-camera-near={0.1}
            shadow-camera-far={100}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
