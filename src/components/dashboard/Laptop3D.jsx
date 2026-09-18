import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import { getStudioEnvironment } from './environment';
import { SCREEN_ASPECT } from './screenshots';
import { PALETTE } from '../icons3d/palette';

/**
 * A laptop, modelled rather than downloaded.
 *
 * A GLTF would be a second network request and ~1–3 MB for a shape that is
 * four boxes and a plane. Modelling it keeps the section inside the performance
 * budget and — the real reason it beats the flat mockup — lets the screen be a
 * live texture slot, so the dashboard shown is the actual screenshot and can be
 * swapped per locale.
 *
 * The lid is sized from the screenshot's own aspect ratio (1600×914) so the UI
 * is never stretched to fit an invented screen shape.
 */

const BEZEL = 0.08;
const SCREEN_W = 3.2;
const SCREEN_H = SCREEN_W / SCREEN_ASPECT + BEZEL * 2;
const PANEL_W = SCREEN_W - BEZEL * 2;
const PANEL_H = SCREEN_H - BEZEL * 2;
const LID_TILT = -0.12; // radians back from vertical

function ScreenSurface({ src }) {
  const texture = useTexture(src);

  useEffect(() => {
    if (!texture) return;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    // The screenshot is 1600px wide on a ~3-unit plane; mips plus anisotropy
    // are what stop the dashboard's small type shimmering as the lid turns.
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh position={[0, 0, 0.055]}>
      <planeGeometry args={[PANEL_W, PANEL_H]} />
      {/* basic material: a screen emits, it is not lit — a physical material
          here reads as a printed photo taped to the lid */}
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function ScreenFallback() {
  return (
    <mesh position={[0, 0, 0.055]}>
      <planeGeometry args={[PANEL_W, PANEL_H]} />
      <meshBasicMaterial color={PALETTE.dark} toneMapped={false} />
    </mesh>
  );
}

export default function Laptop3D({ screenshot, scroll = 0, tilt = { x: 0, y: 0 }, reduce = false, light = false }) {
  const rootRef = useRef(null);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const map = getStudioEnvironment(gl);
    if (map) {
      scene.environment = map;
      scene.environmentIntensity = 0.7;
    }
    // Haze behind the machine. The fog colour has to follow the section's
    // surface, or a dark fog fringes the device on the light background.
    scene.fog = new THREE.Fog(new THREE.Color(light ? '#F5F7F0' : '#06251B'), 6.5, 16);
    return () => {
      scene.environment = null;
      scene.fog = null;
    };
  }, [gl, scene, light]);

  useFrame((state, delta) => {
    const root = rootRef.current;
    if (!root) return;

    if (reduce) {
      root.rotation.set(0.05, -0.18, 0);
      root.position.y = 0;
      return;
    }

    // Scroll drives a gentle yaw sweep; the cursor adds the lean on top.
    const targetY = -0.42 + scroll * 0.84 + tilt.x * 0.3;
    const targetX = 0.06 + tilt.y * 0.18;

    // Critically damped follow, so the model never snaps to the cursor.
    const k = 1 - Math.pow(0.001, delta);
    current.current.x += (targetX - current.current.x) * k;
    current.current.y += (targetY - current.current.y) * k;

    root.rotation.x = current.current.x;
    root.rotation.y = current.current.y;
    root.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.045;
  });

  return (
    <group ref={rootRef} position={[0, -0.25, 0]}>
      <ambientLight intensity={light ? 0.85 : 0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.35} />
      <directionalLight position={[-4, 1, 2]} intensity={0.45} color={PALETTE.greenSoft} />
      <pointLight position={[0, 0.6, 1.8]} intensity={1.1} color={PALETTE.green} distance={6} />

      {/* lid */}
      <group position={[0, SCREEN_H / 2 + 0.06, -0.02]} rotation={[LID_TILT, 0, 0]}>
        <RoundedBox args={[SCREEN_W, SCREEN_H, 0.1]} radius={0.05} smoothness={3}>
          <meshPhysicalMaterial
            color="#0C3024"
            metalness={0.65}
            roughness={0.28}
            clearcoat={1}
            clearcoatRoughness={0.16}
          />
        </RoundedBox>
        <React.Suspense fallback={<ScreenFallback />}>
          {screenshot ? <ScreenSurface src={screenshot} /> : <ScreenFallback />}
        </React.Suspense>
      </group>

      {/* base / keyboard deck */}
      <group position={[0, 0, 0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <RoundedBox args={[SCREEN_W, 2.1, 0.11]} radius={0.05} smoothness={3}>
          <meshPhysicalMaterial
            color="#0A2A20"
            metalness={0.7}
            roughness={0.3}
            clearcoat={0.9}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>
        <mesh position={[0, 0.18, 0.062]}>
          <planeGeometry args={[SCREEN_W - 0.45, 1.18]} />
          <meshStandardMaterial color="#061E17" roughness={0.75} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.72, 0.062]}>
          <planeGeometry args={[1.1, 0.62]} />
          <meshStandardMaterial color="#0B2C22" roughness={0.5} metalness={0.35} />
        </mesh>
      </group>

      {/* the glow the screen throws onto the deck */}
      <mesh position={[0, 0.02, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[SCREEN_W + 0.6, 1.4]} />
        <meshBasicMaterial color={PALETTE.green} transparent opacity={0.07} toneMapped={false} />
      </mesh>
    </group>
  );
}
