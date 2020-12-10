const express = require('express')
const router=require('./router')

const app = express();

/*抽离路由*/
app.get('/', router)

app.listen(5000, function () {
  console.log('server 已经启动')
})