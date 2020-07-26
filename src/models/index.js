const Sequelize = require('sequelize')
const db = {}

const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize({
  host: '127.0.0.1',
  database: 'postgres',
  username: 'postgres',
  password: 'admin',
  operatorsAliases: false,
  logging: console.log,
  dialect: 'postgres',
  port: 5432,
  schema: 'public',
  storage: ':memory:',
  modelPaths: [`${__dirname}/*.model.js`],
  modelMatch: (filename, member) => filename.substring(0, filename.indexOf('.model')) === member.toLowerCase(),
})

const Video = sequelize.import(`${__dirname}/video.model.js`)

module.exports = {
  sequelize,
  Video
}
