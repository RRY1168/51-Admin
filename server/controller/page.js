let db = require('./../utils/db.js')
let projectlist = require('./../model/projectlist.js')

module.exports = {
  async list(ctx) {
    let title = '工单列表'
    let comp = [
      {
        name: 'table'
      }
    ]

    await ctx.render('home', {
      title,
      comp
    })
  },
  async demo(ctx) {
    let title = '项目展示'
    let comp = [
      {
        name: 'card',
        data: await projectlist.getList()
      }
    ]

    await ctx.render('home', {
      title,
      comp
    })
  },
}
