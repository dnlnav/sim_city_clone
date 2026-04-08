import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import City from "./components/City/City";
import { CameraControls } from "@react-three/drei";
import type { CameraControls as CameraControlsImpl } from "@react-three/drei";

export default function App() {
  const controlsRef = useRef<CameraControlsImpl>(null);

  return (
    <Canvas
      scene={{ background: new Color("skyblue") }}
      camera={{
        position: [20, 20, 20],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
    >
      <CameraControls
        ref={controlsRef}
        minDistance={10}
        maxDistance={30}
        onStart={() => {}}
      />
      <City cityLength={16} />
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.3} position={[0, 1, 0]} />
      <directionalLight intensity={0.3} position={[1, 1, 0]} />
      <directionalLight intensity={0.3} position={[0, 1, 1]} />
    </Canvas>
  );
}
