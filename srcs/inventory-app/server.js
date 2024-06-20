const express = require("express")
const { sequelize } = require('./app/models/index'); 
const app = express();
const port = 5000
const db = {}

const routes = require("./app/routes/Routes");

// Sync the database
sequelize.sync().then(() => {
    console.log('Database synced!');
  });
  
app.use("/api/movies", routes)

app.listen(port, async ()=>{
    console.log(`Server is running on port: ${port}`)
})

