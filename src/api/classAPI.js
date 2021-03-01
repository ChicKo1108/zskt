const axios = require('axios');

function create(classVo) {
  return axios.post("/api/class/create", classVo);
}

module.exports = {
  create
};