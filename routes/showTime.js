const express = require("express");
const router = express.Router();
const Showtime = require("../schema/showTime");

// GET /showtimes
router.get("/showtimes", async (req, res) => {
  const showtimes = await Showtime.find().populate("movie").populate("theatre");
  res.json(showtimes);
});

// GET /showtimes/:id
router.get("/showtimes/:id", async (req, res) => {
  const showtime = await Showtime.findById(req.params.id)
    .populate("movie")
    .populate("theatre");
  res.json(showtime);
});

// POST /showtimes
router.post("/showtimes", async (req, res) => {
  const showtime = new Showtime(req.body);
  await showtime.save();
  res.json(showtime);
});

// PUT /showtimes/:id
router.put("/showtimes/:id", async (req, res) => {
  const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("movie")
    .populate("theatre");
  res.json(showtime);
});

// DELETE /showtimes/:id
router.delete("/showtimes/:id", async (req, res) => {
  await Showtime.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
});

router.get("/showtimes/:id", async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id)
      .populate("movie", "title genre") // specify which fields to include from the referenced document
      .populate("theatre", "name address")
      .exec();

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // construct the response object with all the details
    const response = {
      id: showtime._id,
      movie: {
        id: showtime.movie._id,
        title: showtime.movie.title,
        genre: showtime.movie.genre,
      },
      theatre: {
        id: showtime.theatre._id,
        name: showtime.theatre.name,
        address: showtime.theatre.address,
      },
      starttime: showtime.starttime,
      price: showtime.price,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
