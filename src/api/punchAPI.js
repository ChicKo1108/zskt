const axios = require("axios");

function createPunch(data) {
  return axios.post("/api/punch/create", data );
}

module.exports = {
  createPunch
};
