import { Object3D, SphereBufferGeometry, MeshPhongMaterial, Mesh } from "three";
import latLngToVec3 from "./latLngToVec3";
import Marker from "./marker";
import Arc from "./arc";

const Globe = function(radius, texture) {
  Object3D.call(this);

  this.objects = [];

  this.radius = radius;
  this.material = new MeshPhongMaterial({
    color: 0xffffff,
    map: texture
  });

  const globe = new Mesh(
    new SphereBufferGeometry(radius, 64.0, 48.0),
    this.material
  );
  this.add(globe);
};

Globe.prototype = Object.create(Object3D.prototype);

Globe.prototype.clear = function() {
  this.objects.forEach(obj => {
    this.remove(obj);
  });
};

Globe.prototype.addMarker = function(pos, color) {
  const marker = new Marker(color);
  this.objects.push(marker);
  const position = latLngToVec3(this.radius, pos.lat, pos.lng);
  console.log(position);
  marker.position.set(position.x, position.y, position.z);
  this.add(marker);
};

Globe.prototype.drawArc = function(destA, destB, color) {
  const pointA = latLngToVec3(this.radius, destA.lat, destA.lng);
  const pointB = latLngToVec3(this.radius, destB.lat, destB.lng);
  const arc = new Arc(pointA, pointB, color);
  this.objects.push(arc);
  this.add(arc);
};

export default Globe;
