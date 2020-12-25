const config = require('./sqlConfig')
const mysql = require('mysql');

function connect() {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
  })
}

function findUserViews(did) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query("select DISTINCT a.id,a.postdate,a.title,a.content,b.views,c.islike from tb_discuss a,tb_discuss_views b,tb_discuss_likes c where a.id = b.discussid and a.id=c.discussid and a.publisher='" + did + "' and c.`user`='" + did + "'", function (err, results) {
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