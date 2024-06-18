const express=require('express')
const app=express();
const port=5000;

const routes = require('./app/routes/Routes')

app.use('/api/movies',  routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app;

