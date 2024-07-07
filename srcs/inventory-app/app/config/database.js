const { Sequelize } = require('sequelize');

const test = () => {
    if(process.env.DB_PW && process.env.DB_UNAME)
    console.log('DB credentials OK!')
}

//const sequelize = new Sequelize('postgres://postgres:abcd1234@localhost:5432/postgres')
//const sequelize = new Sequelize(`postgres://${process.env.DB_UNAME}:${process.env.DB_PW}@localhost:5432/movies`) // DONT USE FOR PROD!!!!!!!!!!
const sequelize = new Sequelize(process.env.DB_INVENTORY_NAME, process.env.DB_UNAME, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    define: {
        timestamps: false
    }   //Change to your database dialect
});

module.exports = {
    sequelize,
    test,
};
