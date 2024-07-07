const db = require('../models/index.js')


const createMovie = (req, res) => {
  const { title, description } = req.body;  // Deconstruct title and description from req.body

  db.Movie.create({ title, description })
    .then(movie => {
      res.status(201).json(movie);  // Send the created movie as the response
    })
    .catch(error => {
      res.status(400).json({ error: error.message });  // Send the error message as the response
    });
};

// Finds all movies
const findAllMovies = (req, res) => {
  const { title } = req.query;

  if (title) {
    return db.Movie.findOne({ where: title })
      .then(movie => {
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(404).json({ error: 'Movie not found' });
        }
      })
  }
  db.Movie.findAll().then(movies => {
    res.status(200).json(movies);  // Send the created movie as the response
  })
    .catch(error => {
      res.status(400).json({ error: error.message });  // Send the error message as the response
    });
};

const findMovie = (req, res) => {
  const { id, title } = req.query;

  let searchCondition = {};
  if (id) {
    searchCondition.id = id;
  } else if (title) {
    searchCondition.title = title;
  } else {
    return res.status(400).json({ error: 'ID or title is required' });
  }

  db.Movie.findOne({ where: searchCondition })
    .then(movie => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
};

// Updates movie by id
const updateMovie = (req, res) => {
  const { id } = req.query;
  const { title, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  db.Movie.update({ title: title, description: description }, { where: id })
    .then(([rowsUpdated]) => {
      if (rowsUpdated) {
        res.status(200).json({ message: 'Movie updated successfully' });
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
};

// Deletes movie by id
const deleteMovie = (req, res) => {
  const { id } = req.query; // Takes Id from request

  // Check if Id exists
  if (!id) {
    return db.Movie.destroy({
      truncate: true,
    }).then(rowsDeleted => {
      if (rowsDeleted) {
        res.status(200).json({ message: 'All movies deleted successfully' })
      } else {
        res.status(404).json({ error: 'No movies found' })
      }
    });
  }

  // Check if movie exists, if id does, deletes it, if movie doesnt exist, returns error.
  db.Movie.destroy({ where: id })
    .then(rowsDeleted => {
      if (rowsDeleted) {
        res.status(200).json({ message: 'Movie deleted successfully' });
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
};




// Export everything
module.exports = {
  createMovie,
  findAllMovies,
  findMovie,
  updateMovie,
  deleteMovie,
};