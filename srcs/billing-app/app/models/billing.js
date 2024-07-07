const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');  // Assuming you have a database configuration file

const Order = sequelize.define('Orders', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  number_of_items: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Order;