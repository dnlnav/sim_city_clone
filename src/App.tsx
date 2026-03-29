import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <div id="canvas-container" className="h-screen w-full">
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
