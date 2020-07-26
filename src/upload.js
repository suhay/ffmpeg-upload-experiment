const fs = require('fs')
const ffmpeg = require('ffmpeg')
const path = require('path')

const { Video } = require('./models')

const uploadDir = './public/uploads'

module.exports = {
  storeUpload: async (upload, id, sizes, dir = '/') => {
    if (upload) {
      const uploadPath = `${uploadDir}${dir}${upload}`
      fs.copyFileSync(`./video/${upload}`, path.resolve(uploadPath))

      const variables = {}
      variables[`v4k`] = uploadPath.replace('./public', '')

      await Video.update(variables, { where: { id } })
        .catch((e) => {
          throw e
        })

      new ffmpeg(uploadPath, (err, video) => {
        sizes.forEach((size) => {
          console.log('Converting to: ', size)
          video
            .setVideoSize(`?x${size}`, true, true)
            .save(`${path.resolve(uploadPath).replace('.', '_')}_${size}.mp4`, async (error, file) => {
              console.log('Completed conversion: ', size)
              console.log(file)

              const variables = {}
              variables[`v${size}p`] = file ? `${uploadDir.replace('./public', '')}${dir}${path.basename(file)}` : `Error: ${error.message}`

              await Video.update(variables, { where: { id } })
                .catch((e) => {
                  throw e
                })
            })
        })
      })

      return true
    }

    return false
  }
}