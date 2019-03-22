const db = require('./../utils/db.js')

let getList = async function() {
  let sql = "select A.*, B.title as post, B.name, DATE_FORMAT(A.time,'%Y年%m月%d') as _time from project as A left join user as B on A.uid = B.id order by A.month asc"
  let result = await db.query(sql)

  return result
}

module.exports = { getList }
