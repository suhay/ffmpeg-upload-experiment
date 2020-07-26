require('dotenv').config()

const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
const morgan = require('morgan')
const fs = require('fs')

const { sequelize } = require('./models')
const { resolver: resolvers, schema } = require('./graphql')
const { storeUpload } = require('./upload')

const app = express()
const uploadDir = './public/uploads'

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  (() => {
    const webpack = require('webpack')
    const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config')
    const compiler = webpack(webpackConfig)

    app.use(require('webpack-dev-middleware')(compiler, {
      logLevel: 'warn', publicPath: webpackConfig.output.publicPath,
    }))

    app.use(require('webpack-hot-middleware')(compiler, {
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }))
  })()
} else {
  app.use(morgan('tiny'))
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req, res }) => {
    const nreq = req
    const user = nreq.user
    return {
      [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
      user,
      res,
      storeUpload,
    }
  },
})

app.use(express.static(path.resolve('./public')))

app.all('/watch/:id', (req, res) => {
  res.redirect('/')
})

app.all('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'))
})

server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 8080 }, async () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 8080}${server.graphqlPath}`)

  await sequelize.sync(
    // { force: true },
  )
    .then(() => console.log('Connected to database'))
    .catch((err) => {
      console.error('Error: Cannot connect to database -> ', err)
    })
})
