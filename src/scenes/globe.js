import { Mathematics } from "sandpit";

import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Scene,
  TextureLoader,
  Vector3
} from "three";
import Globe from "../modules/globe";
import Bar from "../modules/barChart";
import SkyBox from "../modules/skyBox";
import OrbitControls from "../modules/orbitControls";

const RADIUS = 1;
const COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b"
];

class globeScene {
  constructor(sandpit, renderer) {
    this.renderer = renderer;
    this.settings = sandpit.settings;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      sandpit.width / sandpit.height,
      0.01,
      10000
    );

    this.scene.add(this.camera);
    this.drawWidgets = this.drawWidgets.bind(this);
    this.addScene();
  }

  addScene() {
    const { camera, scene, settings, renderer } = this;

    camera.position.z = RADIUS * 2; // move camera back so we can see the globe

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;
    controls.enablePan = false;
    controls.minDistance = RADIUS * 1.05;
    controls.maxDistance = RADIUS * 10;

    const ambient = new AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const direcitonal = new DirectionalLight(0xffffff, 0.5);
    direcitonal.position.set(5.0, 2.0, 5.0).normalize();
    scene.add(direcitonal);

    const texLoader = new TextureLoader().setCrossOrigin(true);

    const earthTex = texLoader.load("/textures/earth.jpg");
    this.globe = new Globe(RADIUS, earthTex);
    scene.add(this.globe);

    const skyTex = texLoader.load("/textures/space.jpg");
    const skyBox = new SkyBox(RADIUS * 2, skyTex);
    scene.add(skyBox);
  }

  drawWidgets(destinationA, destinationB) {
    const { globe, settings } = this;
    globe.clear();
    console.log(destinationA);
    console.log(destinationB);
    globe.addMarker(destinationA, Mathematics.randomFrom(COLORS));
    globe.addMarker(destinationB, Mathematics.randomFrom(COLORS));
    globe.drawArc(destinationA, destinationB, Mathematics.randomFrom(COLORS));
  }

  change(settings) {
    // const {renderer, scene, camera} = this
    this.globe.material.wireframe = settings.wireframe;
  }

  loop(settings) {
    const { renderer, scene, camera } = this;
    renderer.render(scene, camera);
  }

  resize(width, height) {
    const { camera, renderer } = this;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}
export default globeScene;
