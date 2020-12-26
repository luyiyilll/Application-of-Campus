const express = require('express')
const router = require('./router')
const path = require('path')

const fs = require('fs')
const https = require('https')

const bodyParse = require('body-parser')
const cors = require('cors')

const app = express();
app.use(cors())//解决跨域问题
app.use(bodyParse.urlencoded({ extended: true }))//解析post参数
app.use(bodyParse.json())//解析json形式的body，要在路由之前使用
app.use(express.static(path.join(__dirname + '/temp')))//静态资源,要在路由之前使用

app.use('/', router)//抽离路由

//app.use(express.static("temp"));

app.listen(3000, function () {
  console.log('server 已经启动')
})

/**
 *https服务
 */
/*
const privateKey = fs.readFileSync('./https/4904159_www.appcampus.top.key','utf-8')//密钥
const pem = fs.readFileSync('./https/4904159_www.appcampus.top.pem','utf-8')//证书
const credential = {
  key: privateKey,
  cert: pem
}
const httpsServer = https.createServer(credential, app)//创建https服务

httpsServer.listen(8083, function () {
  console.log('https服务以及启动')
})
*/