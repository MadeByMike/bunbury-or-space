import { Mathematics } from "sandpit";

import {
  OrthographicCamera,
  AmbientLight,
  DirectionalLight,
  MeshBasicMaterial,
  Scene,
  Texture,
  Vector3,
  PlaneGeometry,
  Mesh
} from "three";
import Globe from "../modules/globe";
import Bar from "../modules/barChart";
import SkyBox from "../modules/skyBox";
import OrbitControls from "../modules/orbitControls";
import UITexture from "../modules/UITexture";

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

class UIScene {
  constructor(sandpit, renderer) {
    this.renderer = renderer;
    this.settings = sandpit.settings;
    this.scene = new Scene();
    this.camera = new OrthographicCamera(
      -sandpit.width / 2,
      sandpit.width / 2,
      sandpit.height / 2,
      -sandpit.height / 2,
      0,
      30
    );
    this.uiData = false;
    this.scene.add(this.camera);
    this.addScene(sandpit.width, sandpit.height);
  }

  addScene(width, height) {
    const { camera, scene, settings, renderer } = this;

    const ambient = new AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    this.material = new MeshBasicMaterial({
      map: UITexture(width, height),
      transparent: true
    });

    this.material.transparent = true;

    var planeGeometry = new PlaneGeometry(width, height);
    var plane = new Mesh(planeGeometry, this.material);
    scene.add(plane);
  }

  updateUITexture(width, height) {
    this.material.map = UITexture(width, height, this.uiData);
    this.material.map.needsUpdate = true;
  }

  updateUIData(data) {
    console.log("data:", data);
    //ToDo: extract data
    const uiData = [
      { distance: 100, label: "Space" },
      { distance: data.distance, label: data.locations[1].label }
    ];

    this.uiData = uiData;
  }

  change(settings) {
    // const {renderer, scene, camera} = this
    // this.globe.material.wireframe = settings.wireframe;
  }

  loop(settings) {
    const { renderer, scene, camera } = this;
    renderer.render(scene, camera);
  }

  resize(width, height) {
    const { camera, renderer } = this;
    camera.aspect = width / height;
    this.updateUITexture(width, height);
    camera.updateProjectionMatrix();
  }
}
export default UIScene;
