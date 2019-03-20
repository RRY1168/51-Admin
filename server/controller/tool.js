let db = require('./../utils/db.js')

module.exports = {
  async uploadProject(ctx) {
    let title = '项目上传'
    await ctx.render('upload', {
      title
    })
  },
  async user(ctx) {
    let title = '个人中心'
    await ctx.render('404', {
      title
    })
  },
  async ticket(ctx) {
    let title = '工单列表'
    await ctx.render('404', {
      title
    })
  },
  async ticketAdd(ctx) {
    let title = '创建工单'
    let team = await db.select('team')

    await ctx.render('ticket', {
      title,
      team
    })
  },
}
