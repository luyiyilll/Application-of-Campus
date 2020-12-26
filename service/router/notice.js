const express = require('express')
const router = express()

const { querySql } = require('../sql/index')
const { getList } = require('../sql/noticesql')
const { getFromatTime } = require('../utils/constant')

router.post('/list', function (req, res) {
  getList(req.body.type).then(response => {
    let result = []
    response.forEach(item => {
      let o = {
        id: item.id,
        desc: item.desc,
        place: item.place,
        postdate: getFromatTime(item.postdate),
        time: item.time,
        title: item.title,
      }
      result.push(o)
    })
    res.json({
      code: 1,
      msg: '查询成功',
      data: result
    })
  })

})

module.exports = router
