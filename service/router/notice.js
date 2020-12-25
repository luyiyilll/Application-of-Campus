const express = require('express')
const router = express()

const { querySql } = require('../sql/index')
const { getList } = require('../sql/noticesql')

router.post('/list', function (req, res) {
  getList(req.body.type).then(response => {
    res.json({
      code: 1,
      msg: '查询成功',
      data: response
    })
  })

})

module.exports = router
