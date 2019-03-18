const allConfig = require('./../../config')
const config = allConfig.database
const mysql = require('mysql')

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
})

/**
 * 通用SQL查询方法
 * @param  {string} sql    sql语句
 * @param  {arr}    values sql参数
 * @return {promise}
 */
let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if(err) {
        reject(err)
      }else {
        connection.query(sql, values, (err, rows) => {
          if(err) {
            reject(err)
          }else {
            resolve(rows)
          }

          connection.release()
        })
      }
    })
  })
}

let select = function(_table, _key = '*') {
  let _sql = `select ${_key} from ${_table}`
  return query(_sql, [_key, _table])
}

// let leftJoin = function(_table1, _table2 _key = '*') {
//   let _sql = `select ${_key} from ${_table}1 left join ${_table2} on ${_table1}.`
//   return query(_sql, [_key, _table])
// }

module.exports= {
  query,
  select
}
