import Sandpit, { Color, Mathematics } from "sandpit";
import {
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Scene,
  TextureLoader,
  Vector3
} from "three";
import GlobeScene from "./scenes/globe";
import UIScene from "./scenes/ui";
import "./index.css";

const app = () => {
  const sandpit = new Sandpit(document.querySelector("#root"), Sandpit.WEBGL);
  sandpit.settings = {
    wireframe: {
      value: false
    }
  };

  // Set up the Three WebGL renderer, passing the Sandpit canvas
  const renderer = new WebGLRenderer({
    canvas: sandpit.canvas,
    antialias: true
  });

  // Set the background color
  renderer.setClearColor(0x00000f, 0.5);
  renderer.autoClear = false;

  const globeScene = new GlobeScene(sandpit, renderer);
  const uiScene = new UIScene(sandpit, renderer);

  const bunburyOrSpace = data => {
    console.log("result:", data.locations[0].pos, data.locations[1].pos);
    globeScene.drawWidgets(data.locations[0].pos, data.locations[1].pos);
    uiScene.updateUIData(data);
    uiScene.updateUITexture(sandpit.width, sandpit.height);
  };

  sandpit.change = () => {
    globeScene.change(sandpit.settings);
    uiScene.change(sandpit.settings);
  };

  sandpit.loop = () => {
    // Render the scene each frame
    renderer.clear();
    globeScene.loop();
    renderer.clearDepth();
    uiScene.loop();
  };

  sandpit.resize = () => {
    // On resize, update the aspect ratio
    // and projection matrix of the camera
    uiScene.resize(sandpit.width, sandpit.height);
    globeScene.resize(sandpit.width, sandpit.height);
    // renderer.setSize(sandpit.width, sandpit.height);
  };

  // Start the party
  sandpit.start();
  // Fire the change event to make sure the scale
  // matches the settings passed in
  sandpit.change();

  // Keep the demo in the query string when resetting
  sandpit.reset = (reload = true) => {
    // Keep the demo
    window.history.replaceState(
      {},
      null,
      `${sandpit._getPathFromUrl()}?demo=${sandpit.settings.demo}`
    );
    // Reload the page
    if (reload) window.location.reload();
  };

  // Give a hook back to the sandpit
  return {
    sandpit,
    bunburyOrSpace
  };
};

export default app();
