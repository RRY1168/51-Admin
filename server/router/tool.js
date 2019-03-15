const router = require('koa-router')()
const tool = require('../controller/tool')

const routers = router
  .get('/upload-project', tool.uploadProject)
  .get('/user', tool.user)

module.exports = routers
