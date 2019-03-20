const path = require('path')
const Koa = require('koa')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')

const routers = require('./router/index')

const app = new Koa()

// 使用ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../static')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000)
console.log('程序开始运行')
