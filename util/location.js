const axios = require('axios');

const HttpError = require('../models/http-errors');

const API_KEY = process.env.MAPBOX_API_KEY;

async function getCoordsForAddress(address) {
  const searchText = encodeURIComponent(address);
  const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${API_KEY}`);

  const data = response.data

  if(!response.data.features.length) {
    const error = new HttpError('Could not find location for the specified address.', 422);
    throw error;
  }

  const [lng, lat] = data.features[0].center;

  return { lat, lng };
}

module.exports = getCoordsForAddress;