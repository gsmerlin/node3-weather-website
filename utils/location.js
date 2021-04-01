const request = require("postman-request");

const getLocation = (address, callback) => {
  const token =
    "pk.eyJ1IjoiZ2FicmllbHNtZXJsaW4iLCJhIjoiY2ttd21zd3pxMGY0NTJucGVpeTRvcXl5YiJ9.Hw_dMeziNR3rzKhY42aTbQ";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`;
  const json = true;
  const reqObj = { url, json };
  request(reqObj, (error, response) => {
    if (error) {
      callback("Unable to connect to location API!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      const location = response.body.features[0];
      locationObj = {
        latitude: location.center[1],
        longitude: location.center[0],
        location: location.place_name,
      };
      callback(undefined, locationObj);
    }
  });
};

module.exports = getLocation;
