import app from "./app";
import getLocationsFromGoogleMaps from "./modules/getLocationsFromGoogleMaps";
import getDistanceFromGoogleMaps from "./modules/getDistanceFromGoogleMaps";

var location1 = document.getElementById("location1");
var location2 = document.getElementById("location2");
location1.onchange = onInputChange;
location2.onchange = onInputChange;

window.googleMapsReady = () => {
  onInputChange();
};

function onInputChange() {
  getLocationsFromGoogleMaps(location1.value, location2.value).then(
    locations => {
      getDistanceFromGoogleMaps(locations[0], locations[1]).then(disatance => {
        const data = {
          distance: disatance,
          locations: [
            { pos: locations[0], label: location1.value },
            { pos: locations[1], label: location2.value }
          ]
        };
        app.bunburyOrSpace(data);
      });
    }
  );
}

const script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-cAA1HkzOVpC501RC0_6CdxMOIZ_nkoI&callback=googleMapsReady";
// document.body.appendChild(script);
document.getElementsByTagName("head")[0].appendChild(script);
