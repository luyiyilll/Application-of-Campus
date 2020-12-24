const express = require('express');
const router = express.Router();
const { querySql } = require('../sql/index');
const { findDiscussByOid } = require('../sql/discusssql');
const { findUserViews } = require('../sql/disscuss_views')

router.post('/discuss', function (req, res) {
  let sql = "insert into tb_discuss(title,postdate,content,publisher) values('" + req.body.title + "','" + req.body.postdate + "','" + req.body.content + "','" + req.body.publisher + "')"
  querySql(sql).then(response => {
    querySql("select id from tb_discuss order by postdate desc limit 1").then(reqid => {
      querySql("insert into tb_discuss_views(discussid,views) values('" + reqid[0].id + "',0)").then(r => {
        res.json({
          code: 1,
          msg: '发表成功'
        })
      })
    })
  })
})

router.post('/list/id', function (req, res) {
  let result = [];
  findUserViews(req.body.openid).then(r => {
    console.log('views------', r)
    res.json({
      data: r,
      code: 1,
      msg: '获取用户讨论列表成功'
    })
  })
})



module.exports = router