const express=require('express')
const httpProxy = require('express-http-proxy')
const app=express();
const port=5000;

const userServiceProxy = httpProxy('https://user-service')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})