const express = require('express');
const router = express.Router();
const { querySql } = require('../sql/index');

router.post('/discuss', function (req, res) {
  console.log(req.body);
  let sql = "insert into tb_discuss(title,postdate,content,publisher) values('" + req.body.title + "','" + req.body.postdate + "','" + req.body.content + "','" + req.body.publisher + "')"
  querySql(sql).then(response => {
    res.json({
      code: 1,
      msg: '发表成功'
    })
  })
})

module.exports = router