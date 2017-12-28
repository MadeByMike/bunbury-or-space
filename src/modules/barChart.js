import {
  Object3D,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide
} from "three";

const Bar = function(color) {
  Object3D.call(this);

  var geometry = new PlaneGeometry(0.005, 0.001, 32);
  var material = new MeshBasicMaterial({
    color: 0xffff00,
    side: DoubleSide
  });
  var plane = new Mesh(geometry, material);

  this.add(plane);
};

Bar.prototype = Object.create(Object3D.prototype);

export default Bar;
