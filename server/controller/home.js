let projectlist = require('./../model/projectlist.js')

module.exports = async ctx => {
  let title = '51-Admin 管理后台'
  let data = await projectlist.getList()
  
  await ctx.render('home', {
    title,
    data
  })
}
