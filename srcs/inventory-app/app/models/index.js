const Sequelize = require('sequelize');
const sequelize = require('../config/database');  // Assuming you have a database configuration file

const Movie = require('./movie');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Movie = Movie;

module.exports = db;