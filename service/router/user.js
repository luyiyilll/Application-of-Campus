const express = require('express')
const config = require('./config.json')
const axios = require('axios')
const router = express.Router();

const { querySql } = require('../sql/index')
router.post('/openid', async function (req, res, next) {
  let result;
  await axios.get('http://api.weixin.qq.com/sns/jscode2session?appid=' + config.appId + '&secret=' + config.appScrect + '&js_code=' + req.body.code + '&grant_type=authorization_code').then(response => {
    result = response.data
  })
  console.log('4', result)
  res.json({
    info: result,
    code: 1,
    msg: '登录成功'
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

router.post('/adduser', function (req, res) {
  console.log('req:', req.body)
})

router.get('/info', function (req, res, next) {
  res.json('...')
})

module.exports = router