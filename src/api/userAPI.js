const { default: axios } = require("axios");

function register(data) {
  return axios.post('/api/user/create', data);
}

function login(phone, password) {
  return axios.post('/api/user/login', { phone, password });
}

module.exports = {
  register,
  login
};