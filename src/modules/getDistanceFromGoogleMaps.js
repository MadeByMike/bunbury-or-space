import googleMapsClient from "@google/maps";

const gmaps = googleMapsClient.createClient({
  key: "AIzaSyBhyBaFR21-PkPk2yTdOZaJWIGerLbhmhg",
  Promise: Promise
});

function getDistanceFromGoogleMaps(pos1, pos2) {
  var p1 = gmaps
    .distanceMatrix({
      origins: [pos1],
      destinations: [pos2]
    })
    .asPromise()
    .then(response => response.json)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

export default getDistanceFromGoogleMaps;
