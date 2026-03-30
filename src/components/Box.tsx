import { useRef } from "react";
import type { Mesh } from "three";

export default function Box() {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial />
    </mesh>
  );
}
