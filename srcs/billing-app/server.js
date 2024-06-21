const express = require('express')
const router = require('./routes')
const app = express();
const port = 5002;

app.use('/', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
