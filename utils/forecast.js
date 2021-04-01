const getWeather = require("./weather");
const getLocation = require("./location");

const getForecast = (address) => {

  getLocation(address, (error, location) => {
    if (error) {
      return = {error, undefined};
    } else {
      getWeather(location.latitude, location.longitude, (error, forecast) => {
        if (error) {
          return = {error, undefined};
        } else {
          return = {undefined, forecast};
        }
      });
    }
  });

  return retObject;
};

module.exports = getForecast;