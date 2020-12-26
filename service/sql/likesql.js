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

function likeAction (id, openid) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query("select islike from tb_likes where otherid='" + id + "' and `user`='" + openid + "' and type=0", function (err, results) {
        if (err) {
          reject(err)
        } else {
          if (results[0].islike == 0) {
            conn.query("update tb_likes set islike=1 where otherid='" + id + "' and `user`='" + openid + "' and type=0", function (e, res) {
              resolve(res)
            })
          } else {
            conn.query("update tb_likes set islike=0 where otherid='" + id + "' and `user`='" + openid + "' and type=0", function (e, res) {
              resolve(res)
            })
          }
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
  likeAction
}