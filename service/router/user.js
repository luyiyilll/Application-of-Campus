const express = require('express');
const config = require('./config.json');
const axios = require('axios');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const { getIdentity } = require('../utils/constant')

/*图片处理*/
const formidable = require('formidable');

const { querySql, findUserByOid } = require('../sql/index');

/*如果用户存在，返回用户信息，不存在，返回openid*/
router.post('/openid', async function (req, res, next) {
  let openid;
  await axios.get('http://api.weixin.qq.com/sns/jscode2session?appid=' + config.appId + '&secret=' + config.appScrect + '&js_code=' + req.body.code + '&grant_type=authorization_code').then(response => {
    openid = response.data.openid
    querySql("select * from tb_user where openid='" + openid + "'").then(r => {
      if (r.length == 0) {
        res.json({
          openid: openid,
          code: 1,
          msg: '获取openid成功'
        })
      } else {
        r[0].identity = getIdentity(r[0].identity);
        let info = {
          openid: openid,
          nick_name: r[0].nick_name,
          avatar: r[0].avatar,
          realname: r[0].realname,
          IDcode: r[0].IDcode,
          tel: r[0].tel,
          birthday: new Date(r[0].birthday).getFullYear() + '-' + (new Date(r[0].birthday).getMonth() + 1) + '-' + new Date(r[0].birthday).getDate(),
          gender: r[0].gender,
          grade: r[0].grade,
          academic: r[0].academic,
          major: r[0].major,
          department: r[0].department,
          is_agreen: r[0].is_agreen,
          identity: r[0].identity,
          is_apply: r[0].isapply,
          is_check: r[0].is_check,
          is_pass: r[0].is_pass,
          petition_pic: r[0].petition_pic,
          faimly_pic: r[0].faimly_pic,
          resume_pic: r[0].resume_pic,
          statement_pic: r[0].statement_pic,
          excellent_pic: r[0].excellent_pic,
          certifate_pic: r[0].certifate_pic,
          normal_pic: r[0].normal_pic,
          applybook_pic: r[0].applybook_pic,
          tonormal_pic: r[0].tonormal_pic
        }
        res.json({
          info: info,
          code: 1,
          msg: '登录成功'
        })
      }
    })
  }).catch(e => {
    res.json({
      code: -1,
      msg: '登录失败'
    })
  })
})

/*注册用户*/
router.post('/adduser', function (req, res) {
  let sql = "insert into tb_user(openid,nick_name,avatar,gender,identity,isapply,ischeck,ispass) values('" + req.body.openid + "','" + req.body.nick_name + "','" + req.body.avatarurl + "','" + req.body.gender + "', 0,0,0,0)"
  querySql(sql).then(response => {
    res.json({
      code: 1,
      msg: '添加成功'
    })
  }).catch(e => {
    res.json({
      code: -2,
      msg: '添加失败'
    })
  })
})

/*获取年级*/
router.get('/grade', function (req, res) {
  let now = new Date()
  let nowyear = now.getUTCFullYear()
  let grade = [nowyear]
  for (let i = 0; i < 3; i++) {
    nowyear--;
    grade.push(nowyear)
  }
  res.json({
    data: grade,
    code: 1,
    msg: '更新用户信息成功'
  })
})

/*上传用户信息*/
router.post('/info', function (req, res) {
  let user = req.body.user;
  let sql = "update tb_user set realname='" + user.realname + "',gender='" + user.gender + "',birthday='" + user.birthday + "',IDcode='" + user.IDcode + "',tel='" + user.tel + "',grade='" + user.grade + "',academic='" + user.academic + "',major='" + user.major + "',department='" + user.department + "',identity=1, isapply=1";
  querySql(sql).then(response => {
    res.json({
      code: 1,
      msg: '更新用户信息成功'
    })
  })
})

/*根据openid获取用户信息*/
router.post('/user/id', function (req, res) {
  let openid = req.body.openid;
  findUserByOid(openid).then(response => {
    response[0].identity = getIdentity(response[0].identity);
    console.log(response)
    response[0].birthday = response[0].birthday.getFullYear() + '-' + (response[0].birthday.getMonth() + 1) + '-' + response[0].birthday.getDate()
    res.json({
      user: response[0],
      code: 1,
      msg: '更新用户信息成功'
    })
  })
})

/*上传用户入党申请书*/
router.post('/petition', function (req, res) {
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
    res.json({ data: avatarName })
  })
})

module.exports = router