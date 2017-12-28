import googleMapsClient from "@google/maps";

const gmaps = googleMapsClient.createClient({
  key: "AIzaSyBhyBaFR21-PkPk2yTdOZaJWIGerLbhmhg",
  Promise: Promise
});

function getLocationsFromGoogleMaps(location1, location2) {
  var p1 = gmaps
    .geocode({
      address: location1
    })
    .asPromise()
    .then(response => response.json.results[0].geometry.location)
    .catch(err => console.log(err));

  var p2 = gmaps
    .geocode({
      address: location2
    })
    .asPromise()
    .then(response => response.json.results[0].geometry.location)
    .catch(err => console.log(err));

  return Promise.all([p1, p2]);
}

export default getLocationsFromGoogleMaps;
