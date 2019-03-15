const router = require('koa-router')()
const error = require('../controller/error')

module.exports = router.get('*', error)
