const express = require('express')
const router = express.Router()
const { createMovie, findAllMovies, findMovie, updateMovie, deleteMovie } = require('../controllers/movieController')


// Retrieve all movies or retrieve all the movies with [name] in the title
router.get('/', findAllMovies)

// Create a new product entry
router.post('/', createMovie)

// Delete all movies in the database
router.delete('/', deleteMovie)

// Retrieve a single movie by id
router.get('/:id', findMovie)

// Update a single movie by id
router.put('/:id', updateMovie)

// Delete a single movie by id
router.delete('/:id', deleteMovie)

module.exports = router;