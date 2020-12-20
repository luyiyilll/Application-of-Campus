const path = require('path')
const fs = require('fs')
const formidable = require('formidable');


function picHandler (req) {
  let f;
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname + "/../temp");
  form.keepExtensions = true;//保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;
  //处理图片
  form.parse(req, function (err, fields, files) {
    let filename = files.petition_pic.name
    let nameArray = filename.split('.');
    let type = nameArray[nameArray.length - 1];//后缀名
    let name = '';
    for (let i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    let date = new Date();
    let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
    let avatarName = name + time + '.' + type;
    let newPath = form.uploadDir + "/" + avatarName;
    fs.renameSync(files.petition_pic.path, newPath);  //重命名
    f = files;
  })
  return f;
}

module.exports = {
  picHandler
}