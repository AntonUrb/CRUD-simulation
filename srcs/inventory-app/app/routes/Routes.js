const express = require('express')
const router = express.Router()


// Retrieve all movies or retrieve all the movies with [name] in the title
router.get('/', (req, res) => {
    const title = req.query.title;
    if (title) {
        // Add title specific search here
        res.send({data: "here is " + title})
    } else {
        // Add retrive all movies query here
        res.send({data: "here is ur data"})
    }
})

// Create a new product entry
router.post('/', (req, res) => {
    // create a new product here
    res.send({data: "here is ur data"})
})

// Delete all movies in the database
router.delete('/', (req, res) => {
    // Delete all movies logic here
    res.send({data: "here is ur data"})
})

// Retrieve a single movie by id
router.get('/:id', (req, res) => {
    // Search for specific id 
    res.send({data: "here is ur data"})
})

// Update a single movie by id
router.put('/:id', (req, res) => {
    // Update a movie by id
    res.send({data: "here is ur data"})
})

// Delete a single movie by id
router.delete('/:id', (req, res) => {
    // Delete a movie by id
    res.send({data: "here is ur data"})
})

module.exports = router;