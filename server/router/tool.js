const router = require('koa-router')()
const tool = require('../controller/tool')
const form = require('../controller/form')

const routers = router
  .get('/upload-project', tool.uploadProject)
  .get('/user', tool.user)
  .get('/ticket', tool.ticket)
  .get('/ticket-add', tool.ticketAdd)
  .post('/ticket-add', form.ticketAdd)

module.exports = routers
