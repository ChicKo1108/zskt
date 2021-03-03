const axios = require("axios");

function create(classVo) {
  return axios.post("/api/class/create", classVo);
}

function findById(classId) {
  return axios.get("/api/class/findById", { params: { id: classId } });
}

function getMyClassList () {
  return axios.get("/api/class/findMyClasses");
}

module.exports = {
  create,
  findById,
  getMyClassList
};
