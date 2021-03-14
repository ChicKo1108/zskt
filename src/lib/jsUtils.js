const { VueInstance } = require('../main');

function getStringLocalTime () {
  const localTime = new Date().getHours();
  if (localTime < 8) {
    return "早上";
  } else if (localTime < 11) {
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

function getTimestamp(Hm) {
  console.log(
    new Date(
      new Date(
        new Date(new Date().setHours(Number(Hm.split(":")[0]))).setMinutes(
          Number(Hm.split(":")[1])
        )
      ).setSeconds(0)
    )
  );
  return new Date(
    new Date(new Date().setHours(Number(Hm.split(":")[0]))).setMinutes(
      Number(Hm.split(":")[1])
    )
  ).setSeconds(0);
}

function showAlert(
  title,
  message,
  confirmBtnText,
  cancelBtnText,
  confirmFn = () => {},
  cancelFn = () => {}
) {
  debugger;
  console.log(VueInstance);
  VueInstance.$alert({
    title: title || "",
    message: message || "",
    showCancelButton: true,
    confirmButtonText: confirmBtnText || "确定",
    cancelButtonText: cancelBtnText || "取消"
  }).then((action) => {
    if (action === "confirm") {
      confirmFn();
    } else {
      cancelFn();
    }
  });
}

module.exports = { getStringLocalTime, getTimestamp, showAlert };
