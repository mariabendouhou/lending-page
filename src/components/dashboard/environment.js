import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Soft studio reflections without a network request.
 *
 * drei's <Environment preset> downloads an HDRI; RoomEnvironment is generated
 * on the GPU locally. One 256px PMREM cubemap, built once and reused, is what
 * makes the laptop's shell read as anodised metal rather than flat plastic.
 */

let envMap = null;
let building = false;

export function getStudioEnvironment(renderer) {
  if (envMap || building || !renderer) return envMap;
  building = true;
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const scene = new RoomEnvironment();
    envMap = pmrem.fromScene(scene, 0.04).texture;
    scene.dispose?.();
    pmrem.dispose();
  } catch {
    envMap = null;
  }
  building = false;
  return envMap;
}

export function disposeStudioEnvironment() {
  envMap?.dispose();
  envMap = null;
}
