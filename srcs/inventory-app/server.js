require('dotenv').config({path:'../../.env'})
const express = require("express")
const {sequelize} = require("./app/config/database.js")
const app = express();
const bodyParser = require('body-parser');

const {test} = require('./app/config/database.js')

const routes = require("./app/routes/Routes.js");

app.use(bodyParser.json());
app.use("/api/movies", routes)
// Sync the database
test()
sequelize.sync().then(() => {
    console.log('Database synced!');
    app.listen(process.env.PORT, async () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    })
});
