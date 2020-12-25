const express = require('express');
const router = express.Router();
const { querySql } = require('../sql/index');
const { findDiscussByOid } = require('../sql/discusssql');
const { findUserViews } = require('../sql/disscuss_views')

router.post('/discuss', function (req, res) {
  let sql = "insert into tb_discuss(title,postdate,content,publisher) values('" + req.body.title + "','" + req.body.postdate + "','" + req.body.content + "','" + req.body.publisher + "')"
  querySql(sql).then(response => {
    querySql("select id from tb_discuss order by postdate desc limit 1").then(reqid => {
      querySql("insert into tb_discuss_likes(discussid,user,islike) values('" + reqid[0].id + "','" + req.body.publisher + "',0)").then(r => {
        res.json({
          code: 1,
          msg: '发表成功'
        })
      })
    })
  })
})

router.post('/list/id', function (req, res) {
  findUserViews(req.body.openid).then(r => {
    let result = []
    r.forEach(item => {
      let d = item.postdate;
      let year = d.getUTCFullYear();
      let month = d.getUTCMonth();
      let day = d.getUTCDate();
      let hours = d.getUTCHours() >= 10 ? d.getUTCHours() : ("0" + d.getUTCHours());
      let min = d.getUTCMinutes() >= 10 ? d.getUTCMinutes() : ("0" + d.getUTCMinutes());
      let secends = d.getUTCSeconds() >= 10 ? d.getUTCSeconds() : ("0" + d.getUTCSeconds());
      let date = year + "-" + month + "-" + day + "  " + hours + ":" + min + ":" + secends
      let o = {
        id: item.id,
        title: item.title,
        content: item.content,
        postdate: date,
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



module.exports = router