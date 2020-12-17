const express = require('express')
const config = require('./config.json')
const axios = require('axios')
const router = express.Router();

const { querySql } = require('../sql/index')
router.post('/openid', async function (req, res, next) {
  let openid;
  await axios.get('http://api.weixin.qq.com/sns/jscode2session?appid=' + config.appId + '&secret=' + config.appScrect + '&js_code=' + req.body.code + '&grant_type=authorization_code').then(response => {
    openid = response.data.openid
    querySql("select * from tb_user where openid='" + openid + "'").then(r => {
      console.log(r)
      if (r == "") {
        res.json({
          openid: openid,
          code: 1,
          msg: '登录成功'
        })
      } else {
        let info = {
          nick_name: r.nick_name,
          avatar: r.avatar,
          realname: r.realname,
          IDcode: r.IDcode,
          tel: r.tel,
          birthday: r.birthday,
          gender: r.gender,
          grade: r.grade,
          academic: r.academic,
          major: r.major,
          department: r.department,
          is_agreen: r.is_agreen,
          identity: r.identity,
          is_check: r.is_check,
          is_pass: r.is_pass,
          petition_pic: r.petition_pic,
          faimly_pic: r.faimly_pic,
          resume_pic: r.resume_pic,
          statement_pic: r.statement_pic,
          excellent_pic: r.excellent_pic,
          certifate_pic: r.certifate_pic,
          normal_pic: r.normal_pic,
          applybook_pic: r.applybook_pic,
          tonormal_pic: r.tonormal_pic
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

router.post('/adduser', function (req, res) {
  console.log('req:', req.body)
  querySql("insert into tb_user(openid,nick_name,avatar,gender) values('" + req.body.openid + "','" + req.body.nick_name + "','" + req.body.avatarurl + "','" + req.body.gender + "')").then(response => {
    res.json({
      code: 1,
      msg: '添加成功'
    })
  }).catch(e => {
    console.log('err:', e)
    res.json({
      code: -2,
      msg: '添加失败'
    })
  })
})

  // router.post('/login', function (req, res) {
  //   let result;
  //   axios.get('http://api.weixin.qq.com/sns/jscode2session?appid=' + config.appId + '&secret=' + config.appScrect + '&js_code=' + req.body.code + '&grant_type=authorization_code').then(response => {
  //     // result = res
  //     result = response.data
  //     querySql('insert into tb_user(openid,nick_name,gender,avatar) values()').then(r => {
  //       res.json({
  //         info: result,
  //         code: 1,
  //         msg: '登录成功'
  //       })
  //     })
  //   })
  // })



  .get('/info', function (req, res, next) {
    res.json('...')
  })

module.exports = router