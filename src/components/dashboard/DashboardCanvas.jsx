import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Laptop3D from './Laptop3D';

/**
 * A dedicated canvas for the laptop.
 *
 * The page used to route every 3D icon and this laptop through one shared
 * canvas with drei's <View>. The icons are flat SVG now, so this is the only
 * WebGL on the page and the sharing machinery — a canvas store, a mount gate,
 * per-view scissoring — bought nothing. One component, one canvas.
 *
 * `frameloop` is driven from outside: 'always' while the section is on screen,
 * 'never' otherwise, so a scrolled-past laptop costs nothing.
 */
export default function DashboardCanvas({ active, screenshot, scroll, tilt, reduce, light }) {
  return (
    <Canvas
      className="dashboard-canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <PerspectiveCamera makeDefault fov={32} position={[0, 0.4, 6.4]} near={0.1} far={40} />
      <Laptop3D screenshot={screenshot} scroll={scroll} tilt={tilt} reduce={reduce} light={light} />
    </Canvas>
  );
}
