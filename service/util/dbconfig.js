const mysql = require('mysql')

/*连接数据库*/
let conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'appcampus'
})

conn.connect()

/*执行sql的函数*/
function exec (sql, params) {
  const promise = new Promise((resolve, reject) => {
    conn.query(sql, params, (err, res) => {
      if (err) {
        console.log('出错了')
        return;
      }
      resolve(res)
    })
  })
  return promise;
}


module.exports = exec
