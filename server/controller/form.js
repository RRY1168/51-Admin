let ticket = require('./../model/ticket.js')
let db = require('./../utils/db.js')

module.exports = {
  async ticketAdd(ctx) {
    let result = await ticket.addNew(ctx.request.body)

    let title = '创建工单'
    let team = await db.select('team')

    await ctx.render('ticket', {
      title,
      team
    })

  },
}
