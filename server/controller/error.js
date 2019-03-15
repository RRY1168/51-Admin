module.exports = async ctx => {
  let title = '404 Not Found'
  await ctx.render('404', {
    title
  })
}
