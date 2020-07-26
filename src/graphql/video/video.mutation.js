const { resolver } = require('graphql-sequelize')

const { Video } = require('../../models')

const Mutation = {
  CreateVideo: resolver(Video, {
    before: async (findOptions, data, context) => {
      const { storeUpload } = context
      context.errors = []

      const video = await Video.create(data)
        .catch((e) => {
          throw e
        })

      await storeUpload(data.file, video.id, [480, 240, 1080])

      findOptions.where = { id: video.id }
      return findOptions
    },
    after: (video) => video,
  }),

  UpdateVideo: resolver(Video, {
    before: async (findOptions, data) => {
      const video = await Video.update(data, { where: { id: data.id } })
        .catch((e) => {
          throw e
        })

        findOptions.where = { id: video.id }
        return findOptions
    },
    after: (video) => video,
  }),
}

module.exports = {
  Mutation,
}
