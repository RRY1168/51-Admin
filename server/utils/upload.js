const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 创建项目目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirSync(dirname) {
  if(fs.existsSync(dirname)) {
    return true
  }else {
    if(mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 上传文件名称
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 上传参数 fileType文件类型，path文件存放路径
 * @return {promise}
 */
function uploadFile(ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.hreaders})

  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirResult = mkdirsSync(filePath)

  return new Promise((resolve, reject) => {
    console.log('开始上传文件...')

    let result = {
      success: false,
      message: '',
      data: null
    }

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileName = '文件名';
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)

      file.pipe(fs.createWriteStream(saveTo))

      file.on('end', function() {
        result = {
          success: true,
          message: '文件上传成功',
          data: {
            fileUrl: `//${ctx.host}/`
          }
        }
        console.log('文件上传成功！')
        resolve(result)
      })

      file.on('finish', funcion() {
        console.log('上传操作结束！')
        reslove(result)
      })

      file.on('error', function(err) {
        console.log('上传发生错误！')
        reject(result)
      })

      busboy.on('finish', function() {
        console.log('上传解析结束！')
        reslove(result)
      })

      busboy.on('err', function(err) {
        console.log('上传解析发生错误！')
        reject(result)
      })

      req.pipe(busboy)

    })
  })
}

module.exports = {
  uploadFile
}
