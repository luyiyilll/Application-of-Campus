Vue.prototype.checkLogin = function (path, type) {
  let user_appid = uni.getStorageSync('user_appid');
  let user_name = uni.getStorageSync('user_name');
  let user_avatar = uni.getStorageSync('user_avatar');
  if (user_appid == '' || user_name == '' || user_avatar == '') {
    // 使用重定向的方式跳转至登录页面
    uni.redirectTo({ url: '../login/login?path=' + path + '&type=' + type });
    return false;
  }
  // 登录成功、已经登录返回数组 [用户 id, 用户昵称, 用户表情]
  return [user_appid, user_name, user_avatar];

}