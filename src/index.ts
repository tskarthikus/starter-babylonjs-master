import 'pepjs'

// import { HemisphericLight, Vector3, MeshBuilder, PBRMetallicRoughnessMaterial, Color3, SceneLoader } from '@babylonjs/core'
import { createEngine, createScene, createPBRSkybox, createArcRotateCamera } from './startup'
import { Color3, Vector3, Vector4, Color4 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
// import { PBRMetallicRoughnessMaterial } from "@babylonjs/core/Materials/PBR/pbrMetallicRoughnessMaterial";
// import { Tools } from '@babylonjs/core/Misc/tools';
// import { StandardMaterial } from '@babylonjs/core';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { MeshBuilder, SceneLoader } from '@babylonjs/core';
// import { Camera } from '@babylonjs/core/Cameras/camera';
// import { camera } from "@babylonjs/core/Cameras";
// Import stylesheets
// import './index.css';

const canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement
const engine = createEngine(canvas)
const scene = createScene()

// main function that is async so we can call the scene manager with await
const main = async () => {
  engine.displayLoadingUI();
  createPBRSkybox()
  const cam = createArcRotateCamera()

  // const light = new HemisphericLight('light', new Vector3(0.2,1,0.5), scene)
  // light.intensity = 0.5
  const whole_plan_meshes = SceneLoader.ImportMeshAsync("", "./models/", "Plan_Bibliotheque_Mtp_Compress.glb").then((result) => {
      cam.focusOn(result.meshes, true);
      cam.zoomOn(result.meshes, true);
      engine.hideLoadingUI();
    }, 
    function (evt) {
      // onProgress
      var loadedPercent;
      if (evt.lengthComputable) {
          loadedPercent = (evt.loaded * 100 / evt.total).toFixed();
      } else {
          var dlCount = evt.loaded / (1024 * 1024);
          loadedPercent = (Math.floor(dlCount * 100.0) / 100.0).toFixed();
      }
    }
  );

  // Start the scene
  engine.runRenderLoop(() => {
    scene.render()
  })
}

// start the program
main()


