const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');  // Assuming you have a database configuration file

const Order = require('./billing.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Order = Order;

module.exports = db;