import axios from 'axios'
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    var settle = require('axios/lib/core/settle');
    var buildURL = require('axios/lib/helpers/buildURL');
    const url = new RegExp('^http(s)?://').test(config.url) ? config.url : config.baseURL + config.url // 判断时相对路径还是绝对路径，相对路径添加config.baseURL
    uni.request({
      method: config.method.toUpperCase(),
      url: buildURL(url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };
        settle(resolve, reject, response);
      }
    })
  })
}