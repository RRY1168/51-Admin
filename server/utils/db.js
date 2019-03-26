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
 * 全局存储条件
 * @type {object} 查询条件键值对
 */
let Condition = {};

/**
 * 通用SQL查询方法
 * @param  {string}  sql    sql语句
 * @param  {array}   values sql参数？？？？？
 * @return {promise}        查询结果
 */
let query = function(sql, values) {
  //每次查询重置条件
  Condition = {}

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

let select = function(_list) {
  Condition.select = !_list || _list=== '*' ? 'select *' : `select ${_list.join(',')}`
}

let from = function(_table) {
  Condition.table = `${_table}`
}

let join = function(_table, _term, _dir='') {
  _dir = _dir ? ' '+_dir : ' inner'
  Condition.join = `${_dir} join ${_table} on ${_term}`
}

let where = function(_list) {
  Condition.where = ` where ${_list}`
}

/**
 * 获取一个表的全部数据
 * @param  {string}  _table  表名
 * @param  {number}  _limit  每页记录数
 * @param  {number}  _offset 结果集的偏移
 * @return {promise}         查询结果
 */
let get = function(_table='', _limit, _offset) {
  let _sql = ''
  if(!_table) {//判定Condition存在值
    _sql = `${Condition.select} from ${Condition.table}`
  }else{
    _sql = Condition.select ? `${Condition.select} from ${_table}` : `select * from ${_table}`
  }

  if(Condition.join) {
    _sql += Condition.join
  }

  if(Condition.where) {
    _sql += Condition.where
  }

  if(typeof _limit === 'number' && typeof _offset === 'number') {
    _sql += ` limit ${_offset}, ${_limit}`
  }
  return query(_sql)
}

/**
 * 通过添加where条件，获取一个表的全部数据
 * @param  {string}  _table  表名
 * @param  {object}  _list   where条件的键值对
 * @param  {number}  _limit  每页记录数
 * @param  {number}  _offset 结果集的偏移
 * @return {promise}         查询结果
 */
let get_where = function(_table, _list, _limit, _offset) {
  let _sql = `select * from ${_table}`
  let _where = []
  for(key in _list) {
    typeof _list[key] == 'string' ? _where.push(`${key} = '${_list[key]}'`) : _where.push(`${key} = ${_list[key]}`)
  }
  _where = _where.join(' and ')
  _sql += ` where ${_where}`
  if(typeof _limit === 'number' && typeof _offset === 'number') {
    _sql += ` limit ${_offset}, ${_limit}`
  }

  return query(_sql)
}

module.exports= {
  query,
  select,
  from,
  join,
  where,
  get,
  get_where
}
