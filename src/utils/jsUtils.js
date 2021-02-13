function getStringLocalTime() {
  const localTime = new Date().getHours();
  if (localTime < 11) {
    return "上午";
  } else if (localTime < 13) {
    return "中午";
  } else if (localTime < 17) {
    return "下午";
  } else if (localTime < 24) {
    return "晚上";
  } else {
    return null;
  }
}


export {
  getStringLocalTime
};