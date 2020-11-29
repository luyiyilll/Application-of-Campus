const express = require('express')
const router = require('./router')

const app = express()
app.use('/', router)


/**
 * 自定义路由异常处理中间件
 * 注意：参数四个，方法必须放在路由后面
*/

router.use((err, req, res, next) => {
  const msg = (err && err.message) || '系统错误';
  const statusCode = (err.output && err.output.statusCode) || 500;
  const errorMsg = (err.output && err.output.payload && err.output.playload.error) || err.message
  res.status(statusCode).json({
    code: CODE_ERROR,
    msg,
    error: statusCode,
    errorMsg
  })
})
const server = app.listen(8081, function () {
  let { address, port } = server.address();
  console.log('Node.js服务已启动', address, port)
})






// app.use(require('cors')())/*跨域*/

// app.use('/public', express.static('public'))/*设置public为静态文件的存放文件夹*/


// require('./util/dbconfig')(app)


