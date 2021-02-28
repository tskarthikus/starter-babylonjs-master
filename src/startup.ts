
import '@babylonjs/inspector'
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras";
import { Color4 } from '@babylonjs/core/Maths';
import { Vector3 } from '@babylonjs/core/Maths';
import { CubeTexture } from '@babylonjs/core/Materials/Textures';
import "@babylonjs/core/Helpers/sceneHelpers";
import './loadingScreen';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Camera } from '@babylonjs/core/Cameras/camera';

export let canvas: HTMLCanvasElement
export let engine: Engine
export let scene: Scene
export let camera: ArcRotateCamera
let handleResize: any
export let currentPluginName: any

export const createEngine = (hostCanvas: HTMLCanvasElement) => {
  canvas = hostCanvas
  engine = new Engine(canvas, true, {}, true)

  handleResize = () => engine.resize()
  window.addEventListener('resize', handleResize)

  return engine
}

export const createScene = () => {
  scene = new Scene(engine)

  scene.clearColor = new Color4(0.8, 0.8, 0.8, 1)

  // optimize scene for opaque background
  scene.autoClear = false
  scene.autoClearDepthAndStencil = false
  // engine.displayLoadingUI();

  // show the inspector when pressing shift + alt + I
  scene.onKeyboardObservable.add(({ event }) => {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide()
      } else {
        scene.debugLayer.show()
      }
    }
  })

  SceneLoader.OnPluginActivatedObservable.add(function(plugin) {
      currentPluginName = plugin.name;
      console.info("Plugin name = " + currentPluginName);
  });

  return scene
}

export const createArcRotateCamera = () => {
    const startAlpha = -1.5
    const startBeta = 1.4
    const startRadius = 100
    const startPosition = new Vector3(0, 1, 0)
    //const camera = new ArcRotateCamera('camera', startAlpha, startBeta, startRadius, startPosition, scene, true)
    // const camera = new ArcRotateCamera('camera', -Math.PI/2, Math.PI/2, 3, new Vector3(0, 0, 0), scene);
    // Keep alpha and beta to minimal to have top view.
    const camera = new ArcRotateCamera('camera1', -0.001, 0.0001, 50, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true)

    // Set some basic camera settings
    camera.minZ = -10 // clip at 1 meter
    camera.maxZ = 100;

    camera.panningAxis = new Vector3(1, 0, 1) // pan along ground
    camera.panningSensibility = 1000 // how fast do you pan, set to 0 if you don't want to allow panning
    camera.panningOriginTarget = Vector3.Zero() // where does the panning distance limit originate from
    camera.panningDistanceLimit = 100 // how far can you pan from the origin
    
    camera.allowUpsideDown = false // don't allow zooming inverted
    camera.lowerRadiusLimit = 2 // how close can you zoom
    camera.upperRadiusLimit = 100 // how far out can you zoom
    camera.lowerBetaLimit = 0.0001 // how high can you move the camera
    camera.upperBetaLimit = Math.PI / 2.5 // how low down can you move the camera
    
    camera.checkCollisions = true // make the camera collide with meshes
    camera.collisionRadius = new Vector3(2, 2, 2) // how close can the camera go to other meshes

    camera.wheelPrecision = 50;
    camera.pinchPrecision = 50;
    return camera
}

export const createPBRSkybox = () => {
  const environmentTexture = CubeTexture.CreateFromPrefilteredData(
    'https://assets.babylonjs.com/environments/environmentSpecular.env',
    scene,
  )
  
  const skyboxMesh = scene.createDefaultSkybox(environmentTexture, true, 1000, 0.5, true) 
  return skyboxMesh
}

export const setOrthoView = () => {
  const cam = scene.activeCamera;
  if (cam != null)
  {
    cam.mode = Camera.ORTHOGRAPHIC_CAMERA;
    var distance = 50;	
    const engine = scene.getEngine();
    const clientRect = engine.getRenderingCanvasClientRect();
    if (engine != null && clientRect != null)
    {
      var aspect = clientRect.height / clientRect.width; 
      cam.orthoLeft = -distance/2;
      cam.orthoRight = distance / 2;
      cam.orthoBottom = cam.orthoLeft * aspect;
      cam.orthoTop = cam.orthoRight * aspect;
    }
  }
}
export const setCenterAsTarget = (result : any, cam : ArcRotateCamera) => {
    if (result.meshes.length) {
        var worldExtends = scene.getWorldExtends();
      
      // Find center of worldExtends (all meshes)      
      let center = worldExtends.min.add(worldExtends.max).divideInPlace(new Vector3(2,2,2));
      cam.target.copyFrom(center)

      // Fix camera angles.
      // cam.alpha = cam.beta = Math.PI / 2;
      cam.alpha = -0.001;
      cam.beta = 0.001;

      // Calculate lowerRadiusLimit & add camera.minZ to avoid clipping.
      cam.lowerRadiusLimit = Vector3.Distance(center, worldExtends.min) + cam.minZ;
    }
  }