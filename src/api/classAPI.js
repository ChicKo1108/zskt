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

function searchClass (searchString) {
  return axios.get("/api/class/findClassByNameAndId", {params: {searchString}});
}

function apply2AddClass (classId) {
  return axios.get("/api/class/apply2Add", {params: {classId}});
}

function handleApply (studentId, classId, isPass) {
  return axios.get("/api/class/handleApply", { params: { studentId, classId, isPass } });
}



module.exports = {
  create,
  findById,
  getMyClassList,
  searchClass,
  apply2AddClass,
  handleApply
};
