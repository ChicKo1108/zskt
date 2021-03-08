const axios = require("axios");

function createPunch(data) {
  return axios.post("/api/punch/create", data );
}

function stopPunch (id) {
  return axios.get("/api/punch/stopPunch", { params: { id } });
}

function getPunchingList () {
  return axios.get("/api/punch/getPunching");
}

module.exports = {
  createPunch,
  stopPunch,
  getPunchingList
};
