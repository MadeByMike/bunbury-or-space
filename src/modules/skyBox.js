import {
  Object3D,
  SphereBufferGeometry,
  MeshPhongMaterial,
  Mesh,
  BackSide
} from "three";

const SkyBox = function(radius, texture) {
  Object3D.call(this);

  const material = new MeshPhongMaterial({
    color: 0x0000000,
    side: BackSide,
    map: texture
  });

  const sky = new Mesh(new SphereBufferGeometry(radius), material);
  this.add(sky);
};

SkyBox.prototype = Object.create(Object3D.prototype);

export default SkyBox;
