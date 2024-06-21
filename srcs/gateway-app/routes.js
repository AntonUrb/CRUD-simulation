const express = require('express')
const router = express.Router()
const proxy = require('./proxy')

router.use('/api/movies', proxy.movie)

module.exports = router;