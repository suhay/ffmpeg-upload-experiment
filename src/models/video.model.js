const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class Video extends Sequelize.Model { }

  Video.init({
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    v240p: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    v480p: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    v1080p: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    v4k: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
    uploadAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
  }, {
    sequelize,
    modelName: 'video',
    tableName: 'video',
    timestamps: true,
  })

  return Video
}
