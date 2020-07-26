const { resolver } = require('graphql-sequelize')

const { Video } = require('../../models')

const Query = {
  Video: resolver(Video, {
    before: async (findOptions, { id }) => {
      findOptions.where = { id }
      return findOptions
    },
    after: (video) => video,
  }),

  Videos: resolver(Video, {
    before: async (findOptions) => {
      return findOptions
    },
    after: (video) => video,
  }),
}

module.exports = {
  Query,
}
