const axios = require("axios");

function createPunch(data) {
  return axios.post("/api/punch/create", data);
}

function stopPunch(id) {
  return axios.get("/api/punch/stopPunch", { params: { id } });
}

function getPunchingList() {
  return axios.get("/api/punch/getPunching");
}

function readPunch(id) {
  return axios.get("/api/punch/readPunch", { params: { id } });
}

function getPunchById(id) {
  return axios.get("/api/punch/getPunchById", { params: { id } });
}

function deletePunch (id) {
  return axios.delete("/api/punch/delete", { params: { id } });
}

module.exports = {
  createPunch,
  stopPunch,
  getPunchingList,
  readPunch,
  getPunchById,
  deletePunch
};
