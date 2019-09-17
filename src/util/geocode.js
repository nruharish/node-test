const request = require("request");

const geoCode = (address, callback) => {
  const mapbox_url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?country=in&access_token=pk.eyJ1IjoiYnNoYXJpc2giLCJhIjoiY2swNmNsYWtwM256ZjNjcGZyNXB0b2FxMCJ9.s9e7eVIF1aNIg8hwqCVifQ&limit=1";
  request({ url: mapbox_url, json: true }, (error, response) => {
    if (error) {
      callback("Could not connect to geo coding service", undefined);
    } else if (response.body.features.length == 0) {
      callback("place not found", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[0],
        long: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = { geoCode: geoCode };
