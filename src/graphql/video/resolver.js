const { Query } = require('./video.query')
const { Mutation } = require('./video.mutation')

const resolver = {
  Query,
  Mutation,
}

module.exports = {
  resolver,
}
