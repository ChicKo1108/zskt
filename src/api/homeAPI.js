const { default: axios } = require("axios");

function getPageData () {
  return axios.get('/api/home/getPageData');
}

module.exports = {
  getPageData
};