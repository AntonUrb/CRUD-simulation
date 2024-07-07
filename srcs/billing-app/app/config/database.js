const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://postgres:abcd1234@localhost:5432/postgres') // DONT USE FOR PROD!!!!!!!!!!
const sequelize = new Sequelize(process.env.DB_BILLING_NAME, process.env.DB_UNAME, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  define: {
    timestamps: false
  }   //Change to your database dialect
});

module.exports = sequelize;