import {
  Object3D,
  Geometry,
  Curve,
  LineBasicMaterial,
  Line,
  Vector3
} from "three";

const generateCircle = function(pointA, pointB) {
  console.log(pointA, pointB);
  const arcA = pointA.multiplyScalar(1.005);
  const arcB = pointB.multiplyScalar(1.005);
  const angle = pointA.angleTo(pointB);
  return function(t) {
    const vec = new Vector3()
      .addVectors(
        arcA.clone().multiplyScalar(Math.sin((1 - t) * angle)),
        arcB.clone().multiplyScalar(Math.sin(t * angle))
      )
      .divideScalar(Math.sin(angle));
    return vec;
  };
};

const Arc = function(pointA, pointB, color) {
  Object3D.call(this);

  const curve = new Curve();
  curve.getPoint = generateCircle(pointA, pointB);

  const lineGeometry = new Geometry();
  lineGeometry.vertices = curve.getPoints(50);
  lineGeometry.computeLineDistances();
  const lineMaterial = new LineBasicMaterial({
    color: color,
    lineWidth: 2
  });
  const line = new Line(lineGeometry, lineMaterial);

  this.add(line);
};

Arc.prototype = Object.create(Object3D.prototype);

export default Arc;
