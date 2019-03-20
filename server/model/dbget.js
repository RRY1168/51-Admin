const db = require('./../utils/db.js')

let select = async function(table) {
  let sql = `select * from ${table}`
  let result = await db.query(sql)

  return result
}

module.exports = { select }
