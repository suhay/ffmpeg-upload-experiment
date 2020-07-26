const glue = require('schemaglue')

const { schema, resolver } = glue('src/graphql')

module.exports = {
  schema,
  resolver,
}
