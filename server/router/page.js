const router = require('koa-router')()
const page = require('../controller/page')
// const tool = require('../controller/tool')
// const form = require('../controller/form')

const routers = router
  .get('/demo', page.list)

module.exports = routers
