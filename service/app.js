const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const userApi = require('./api/user')

const app = express()
app.use('/api/user', userApi)


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(8081, function () {

  console.log('Node.js服务已启动')
})






// app.use(require('cors')())/*跨域*/
// app.use('/public', express.static('public'))/*设置public为静态文件的存放文件夹*/
// require('./util/dbconfig')(app)


