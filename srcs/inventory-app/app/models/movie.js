const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');  // Assuming you have a database configuration file

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Movie;