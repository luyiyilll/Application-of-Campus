const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const mysqlConfig = require('../sql/dbconfig');
const userSql = require('../slq/user.js')
import { jsonWrite } from '../err'

let conn = mysql.createConnection({ mysqlConfig });
conn.connect();

router.post('/login', (req, res) => {
  let sql = userSql.getStudentByAppId;
  let params = req.body;
  conn.query(sql, [params.appid], function (err, result) {
    if (err) {
      console.log("查找失败")
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router; 