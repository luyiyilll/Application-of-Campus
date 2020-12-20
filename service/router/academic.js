const express = require('express')
const router = express()

const { querySql } = require('../sql/index')

/*获取学院*/
router.get('/all', function (req, res) {
  let sql = 'select DISTINCT academic from tb_academic_major';
  querySql(sql).then(response => {
    let academic = [];
    response.forEach(element => {
      academic.push(element.academic)
    });
    res.json({
      academic
    })
  })

})

/*根据学院获取专业*/
router.post('/major', function (req, res) {
  let academic = req.body.academic;
  let sql = "select major from tb_academic_major where academic='" + academic + "'";
  querySql(sql).then(response => {
    let major = [];
    response.forEach(element => {
      major.push(element.major)
    })
    res.json({
      major
    })
  })
})

/*获取部门*/
router.get('/depart', function (req, res) {
  let academic = req.query.academic;
  let sql = "select DISTINCT depart from tb_academic_major where academic='" + academic + "'";
  querySql(sql).then(response => {
    let depart = [];
    response.forEach(element => {
      depart.push(element.depart)
    })
    res.json({
      depart
    })
  })
})

module.exports = router