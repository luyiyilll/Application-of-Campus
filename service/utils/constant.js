function getIdentity (id) {
  let identity;
  switch (id) {
    case 0:
      identity = "群众"
      break;
    case 1:
      identity = "入党申请人";
      break;
    case 2:
      identity = "积极分子";
      break;
    case 3:
      identity = "发展对象";
      break;
    case 4:
      identity = "预备党员";
      break;
    case 5:
      identity = "正式党员";
      break;
  }
  return identity;
}

function getFromatTime (utcDate) {
  let year = utcDate.getUTCFullYear();
  let month = utcDate.getUTCMonth();
  let day = utcDate.getUTCDate();
  let hours = utcDate.getUTCHours() >= 10 ? utcDate.getUTCHours() : ("0" + utcDate.getUTCHours());
  let min = utcDate.getUTCMinutes() >= 10 ? utcDate.getUTCMinutes() : ("0" + utcDate.getUTCMinutes());
  let secends = utcDate.getUTCSeconds() >= 10 ? utcDate.getUTCSeconds() : ("0" + utcDate.getUTCSeconds());
  return (year + "-" + month + "-" + day + "  " + hours + ":" + min + ":" + secends)
}

module.exports = {
  CODE_ERROR: -1,
  getIdentity,
  getFromatTime
}