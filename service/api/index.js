const express = require('express')

const router = express.Router()
router.get('/', function (req, res) {
  res.end('123')
})

module.exports = router