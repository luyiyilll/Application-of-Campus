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

function findUserViews (did) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query("select a.id,a.postdate,a.title,a.content,b.views from tb_discuss a,tb_discuss_views b where a.id = b.discussid and a.publisher='" + did + "'", function (err, results) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end
    }
  })
}


module.exports = {

  findUserViews
}