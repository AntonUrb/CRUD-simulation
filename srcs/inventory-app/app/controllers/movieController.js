const {Movie} = require('../models/movies')


const createMovie = (req, res) => {
    const { title, description } = req.body;  // Deconstruct title and description from req.body
  
    Movie.create({ title, description })
      .then(movie => {
        res.status(201).json(movie);  // Send the created movie as the response
      })
      .catch(error => {
        res.status(400).json({ error: error.message });  // Send the error message as the response
      });
};



// Export everything
module.exports = {
    createMovie,
  };