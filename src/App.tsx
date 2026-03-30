import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import Box from "./components/Box";
import { CameraControls } from "@react-three/drei";

export default function App() {
  return (
    <Canvas
      scene={{ background: new Color(0x777777) }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <CameraControls />
      <Box />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
    </Canvas>
  );
}
