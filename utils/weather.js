const request = require("postman-request");

const getForecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e14e46a28965bdd1b3df47ff851c346e&query=${lat},${lon}`;
  const json = true;
  const reqObj = { url, json };
  request(reqObj, (error, response) => {
    if (error) {
      callback("Unable to connect to weather API!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const weather = response.body.current;
      weatherObj = {
        temperature: weather.temperature,
        precip: weather.precip,
        feelslike: weather.feelslike,
      };
      callback(undefined, weatherObj);
    }
  });
};

module.exports = getForecast;