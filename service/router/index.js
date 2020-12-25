const express = require('express')
const boom = require('boom');
const userRouter = require('./user')
const academicRouter = require('./academic')
const discussRouter = require('./discuss')
const noticeRouter = require('./notice')
const likeRouter = require('./like')
const { COOE_ERROR } = require('../utils/constant')

const router = express.Router()

router.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('欢迎进入')
})

/*用户router*/
router.use('/user', userRouter)
/*学院router*/
router.use('/academic', academicRouter)
/*讨论router*/
router.use('/discuss', discussRouter)
/*文章、通知、公示名单router*/
router.use('/notice', noticeRouter)
/*点赞Router*/
router.use('/like', likeRouter)

/*集中异常处理404*/
router.use((req, res, next) => {
  /*放行异常到后面的异常处理*/
  next(boom.notFound('接口不存在'))
})
/*自定义路由异常处理中间件*/
router.use((err, req, res, next) => {
  console.log(err)
  const msg = (err && err.message) || '系统错误';
  const statusCode = (err.output && err.output.statusCode) || 500;
  const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
  res.status(statusCode).json({
    code: COOE_ERROR,
    msg,
    error: statusCode,
    errorMsg
  })
})

module.exports = router