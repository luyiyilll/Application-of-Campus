const express = require('express')
const config = require('./config.json')
const axios = require('axios')
const router = express.Router();

const { querySql } = require('../sql/index')

/*如果用户存在，返回用户信息，不存在，返回openid*/
router.post('/openid', async function (req, res, next) {
  let openid;
  await axios.get('http://api.weixin.qq.com/sns/jscode2session?appid=' + config.appId + '&secret=' + config.appScrect + '&js_code=' + req.body.code + '&grant_type=authorization_code').then(response => {
    openid = response.data.openid
    querySql("select * from tb_user where openid='" + openid + "'").then(r => {
      if (r == "") {
        res.json({
          openid: openid,
          code: 1,
          msg: '登录成功'
        })
      } else {
        let info = {
          nick_name: r[0].nick_name,
          avatar: r[0].avatar,
          realname: r[0].realname,
          IDcode: r[0].IDcode,
          tel: r[0].tel,
          birthday: r[0].birthday,
          gender: r[0].gender,
          grade: r[0].grade,
          academic: r[0].academic,
          major: r[0].major,
          department: r[0].department,
          is_agreen: r[0].is_agreen,
          identity: r[0].identity,
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

router.get('/grade', function (req, res) {
  let now = new Date()
  let nowyear = now.getUTCFullYear()
  let grade = [nowyear]
  for (let i = 0; i < 3; i++) {
    nowyear--;
    grade.push(nowyear)
  }
  console.log(grade)
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