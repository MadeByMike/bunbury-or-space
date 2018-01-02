function getDistanceFromGoogleMaps(pos1, pos2) {
  const service = new window.google.maps.DistanceMatrixService();
  return new Promise((resolve, reject) => {
    service.getDistanceMatrix(
      {
        origins: [pos1],
        destinations: [pos2],
        travelMode: "DRIVING"
      },
      response => {
        resolve(response);
      }
    );
  })
    .then(result => {
      return (result.rows[0].elements[0].distance.value / 1000).toFixed(1);
    })
    .catch(err => console.log(err));
}

export default getDistanceFromGoogleMaps;
