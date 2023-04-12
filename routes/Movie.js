const express = require("express");
const router = express.Router();
const Movie = require("../schema/movieSchema");
const ShowTime = require("../schema/showTime");

// GET /movies
router.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// GET /movies/:id
router.get("/movies/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

// POST /movies
router.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie); // return 201 status code and movie data
    console.log(res);
  } catch (err) {
    res.status(400).json({ message: err.message }); // return error message
  }
});

// PUT /movies/:id
router.put("/movies/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(movie);
});

// DELETE /movies/:id
router.delete("/movies/:id", async (req, res) => {
  await Movie.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
});



module.exports = router;
