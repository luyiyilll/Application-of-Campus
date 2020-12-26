const config = require('./sqlConfig')
const mysql = require('mysql');

function connect () {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
  })
}

/*根据类型获取通知、会议、公示列表*/
function getList (type) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query("select * from tb_meetting_notice where type='" + type + "'", function (err, results) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    } catch (e) {
      reject(err)
    } finally {
      conn.end()
    }
  })
}

/*根据id获取内容*/
function getContentById (id) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query("select * from tb_meetting_notice where id='" + id + "'", function (err, results) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  })
}

module.exports = {
  getList,
  getContentById
}