import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function TwinCore() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.08;
      const mx = state.pointer.x;
      const my = state.pointer.y;
      group.current.rotation.y += mx * 0.15;
      group.current.rotation.x += my * 0.1;
    }
    if (outer.current) {
      outer.current.rotation.y = -t * 0.08;
      outer.current.rotation.z = t * 0.04;
    }
    if (inner.current) {
      const s = 1 + Math.sin(t * 0.8) * 0.02;
      inner.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={group}>
      <Sphere ref={inner} args={[1.15, 96, 96]}>
        <MeshDistortMaterial
          color="#5eead4"
          emissive="#1b7a6a"
          emissiveIntensity={0.25}
          roughness={0.08}
          metalness={0.72}
          distort={0.42}
          speed={1.4}
          envMapIntensity={1.4}
        />
      </Sphere>

      <Sphere ref={outer} args={[1.55, 48, 48]}>
        <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.28} />
      </Sphere>

      <Sphere args={[1.82, 32, 32]}>
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.08} />
      </Sphere>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 4, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={2} color="#a78bfa" />
      <pointLight position={[3, -3, 2]} intensity={1.5} color="#5eead4" />
    </>
  );
}

export default function TwinObject() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
          <TwinCore />
        </Float>
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
