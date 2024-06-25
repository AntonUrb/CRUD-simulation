const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:abcd1234@localhost:5432/postgres') // DONT USE FOR PROD!!!!!!!!!!
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   define: {
//      timestamps:false
//   }   Change to your database dialect
// });

module.exports = sequelize;