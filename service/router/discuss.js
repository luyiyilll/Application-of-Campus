const express = require('express');
const router = express.Router();
const { querySql } = require('../sql/index');
const { getFromatTime } = require('../utils/constant');
const { findUserViews } = require('../sql/disscuss_views')
const { getAllDiscussList } = require("../sql/discusssql")

/*发表讨论*/
router.post('/discuss', function (req, res) {
  let sql = "insert into tb_discuss(title,postdate,content,publisher) values('" + req.body.title + "','" + req.body.postdate + "','" + req.body.content + "','" + req.body.publisher + "')"
  querySql(sql).then(response => {
    querySql("select id from tb_discuss order by postdate desc limit 1").then(reqid => {
      querySql("insert into tb_likes(otherid,user,islike,type) values('" + reqid[0].id + "','" + req.body.publisher + "',0,0)").then(r => {
        res.json({
          code: 1,
          msg: '发表成功'
        })
      })
    })
  })
})

/*根据用户id获取讨论列表*/
router.post('/list/id', function (req, res) {
  findUserViews(req.body.openid).then(r => {
    let result = []
    r.forEach(item => {
      let o = {
        id: item.id,
        title: item.title,
        content: item.content,
        postdate: getFromatTime(item.postdate),
        views: item.views,
        islike: item.islike
      }
      result.push(o)
    })
    res.json({
      data: result,
      code: 1,
      msg: '获取用户讨论列表成功'
    })
  })
})

/*获取全部用户讨论列表*/
router.get('/all', function (req, res) {
  getAllDiscussList().then(response => {
    res.json({
      code: 1,
      msg: '查询成功',
      data: response
    })
  })
})

module.exports = router