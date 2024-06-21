const express = require("express")
const sequelize = require("./app/config/database.js")
const app = express();
const port = 5000
const bodyParser = require('body-parser');

const routes = require("./app/routes/Routes.js");

app.use(bodyParser.json());
app.use("/api/movies", routes)
// Sync the database
sequelize.sync().then(() => {
    console.log('Database synced!');
    app.listen(port, async () => {
        console.log(`Server is running on port: ${port}`)
    })
});