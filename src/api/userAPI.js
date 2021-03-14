const axios = require("axios");

function register(data) {
  return axios.post('/api/user/create', data);
}

function login(phone, password) {
  return axios.post('/api/user/login', { phone, password });
}

function updateUserInfo(userInfo) {
  return axios.post('/api/user/updateUserInfo', { userInfo });
}

function getMyUserInfo () {
  return axios.get('/api/user/getMyUserInfo');
}

function checkPassword (password) {
  return axios.post('/api/user/checkPassword', { password });
}

function updatePassword (oriPassword, password, checkPassword) {
  return axios.post('/api/user/updatePassword', {
    oriPassword,
    newPassword: password,
    checkPassword
  });
}

module.exports = {
  register,
  login,
  updateUserInfo,
  getMyUserInfo,
  checkPassword,
  updatePassword
};