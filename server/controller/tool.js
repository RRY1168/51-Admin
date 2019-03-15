module.exports = {
  async uploadProject(ctx) {
    console.log(123)
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
}
