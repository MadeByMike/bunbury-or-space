import app from "./app";
import getLocationsFromGoogleMaps from "./modules/getLocationsFromGoogleMaps";
import getDistanceFromGoogleMaps from "./modules/getDistanceFromGoogleMaps";

var location1 = document.getElementById("location1");
var location2 = document.getElementById("location2");

location1.onchange = onInputChange;
location2.onchange = onInputChange;

function onInputChange() {
  console.log("Input change", location1.value, location2.value);
  getLocationsFromGoogleMaps(location1.value, location2.value).then(
    locations => {
      console.log("result:", locations);
      const data = {
        distance: 1000,
        locations: [
          { pos: locations[0], label: location1.value },
          { pos: locations[1], label: location2.value }
        ]
      };
      getDistanceFromGoogleMaps(locations[0], locations[1]);
      app.bunburyOrSpace(data);
    }
  );
}

onInputChange();
