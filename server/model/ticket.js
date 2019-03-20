const db = require('./../utils/db.js')

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

let getMaxID = async function(id) {
  let sql = `select max(id) as id from ticket where id like '${id}%'`
  let result = await db.query(sql)

  return result
}

let addNew = async function(el) {
  let time = el.time || new Date().Format('yyyyMMdd')

  let maxID = await getMaxID(time)
  let id = maxID[0].id ? (maxID[0].id+'').substr(-2) : 0
      id = parseInt(id)+1
      id = id < 10 ? '0'+id : id
      id = time+id

  let title = el.title || ''
  let edition = el.edition || ''
  let producter = el.producter || ''
  let developer = el.developer || ''
  let team = el.team || ''
  let status = el.status || 0

  let val = `${id}, '${title}', '${edition}', '${producter}', '${developer}', '${team}', ${status}`

  let sql = `insert into ticket values (${val}, CURRENT_TIMESTAMP)`
  let result = await db.query(sql)

  // return result
}

module.exports = { addNew }
