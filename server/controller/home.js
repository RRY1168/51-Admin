module.exports = async ctx => {
  let title = '51-Admin 管理后台'
  await ctx.render('home', {
    title
  })
}
