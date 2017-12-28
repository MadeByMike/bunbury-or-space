import { Vector3 } from "three";

const latLngToVec3 = function(radius, lat, lng) {
  const latRad = lat * Math.PI / 180.0;
  const lngRad = -lng * Math.PI / 180.0;
  return new Vector3(
    radius * Math.cos(latRad) * Math.cos(lngRad),
    radius * Math.sin(latRad),
    radius * Math.cos(latRad) * Math.sin(lngRad)
  );
};

export default latLngToVec3;
