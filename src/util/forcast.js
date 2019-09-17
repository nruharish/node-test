request = require("request");

const forcast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/6ae96a9e76aec248a9d2b0f948464334/37.8267,-122.4233?lang=es";
  request({ url: url, json: true }, (error, response) => {
    //const data = JSON.parse(response.body);
    //   console.log(response.body.currently);
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        temp: response.body.currently.temperature,
        rain: response.body.currently.precipProbability
      });
    }
  });
};

module.exports = forcast;
