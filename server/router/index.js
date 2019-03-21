const router = require('koa-router')()

const home = require('./home')
const tool = require('./tool')
const page = require('./page')
const error = require('./error')


router.use('/', home.routes(), home.allowedMethods())
router.use('/tool', tool.routes(), tool.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/', error.routes(), error.allowedMethods())

module.exports = router
