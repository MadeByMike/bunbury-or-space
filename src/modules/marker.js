import { Object3D, SphereBufferGeometry, MeshPhongMaterial, Mesh } from "three";

const Marker = function(color) {
  Object3D.call(this);

  var sphereRadius = 0.005;
  var height = 0;

  var material = new MeshPhongMaterial({ color: color });

  var sphere = new Mesh(
    new SphereBufferGeometry(sphereRadius, 16, 8),
    material
  );
  sphere.position.y = height;
  this.add(sphere);
};

Marker.prototype = Object.create(Object3D.prototype);

export default Marker;
