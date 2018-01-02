import googleMapsClient from "@google/maps";

function getLocationsFromGoogleMaps(location1, location2) {
  const service = new window.google.maps.Geocoder();
  const p1 = new Promise((resolve, reject) => {
    service.geocode(
      {
        address: location1
      },
      results => {
        resolve({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      }
    );
  });

  const p2 = new Promise((resolve, reject) => {
    service.geocode(
      {
        address: location2
      },
      results => {
        resolve({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      }
    );
  });

  return Promise.all([p1, p2])
    .then(results => {
      return [results[0], results[1]];
    })
    .catch(err => console.log(err));
}

export default getLocationsFromGoogleMaps;
