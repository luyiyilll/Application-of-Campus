function getIdentity (status) {
  let identity;
  switch (status) {
    case '群众':
      identity = 0
      break;
    case "入党申请人":
      identity = 1;
      break;
    case "积极分子":
      identity = 2;
      break;
    case "发展对象":
      identity = 3;
      break;
    case "预备党员":
      identity = 4;
      break;
    case "正式党员":
      identity = 5;
      break;
  }
  return identity;
}

function getFromatTime (postdate) {
  let date = new Date(postdate)
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours() >= 10 ? date.getHours() : ("0" + date.getHours());
  let min = date.getMinutes() >= 10 ? date.getMinutes() : ("0" + date.getMinutes());
  let secends = date.getSeconds() >= 10 ? date.getSeconds() : ("0" + date.getSeconds());
  return (year + "-" + month + "-" + day + "  " + hours + ":" + min + ":" + secends)
}

module.exports = {
  getIdentity,
  getFromatTime
}