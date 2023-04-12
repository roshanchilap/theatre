// Import dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Theatre = require("../schema/theatreSchema");
// Define routes for Theatre documents

// GET all Theatre documents
router.get("/theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single Theatre document by ID
router.get("/theatres/:id", getTheatre, (req, res) => {
  res.json(res.theatre);
});

// CREATE a new Theatre document
router.post("/theatres", async (req, res) => {
  const theatre = new Theatre({
    name: req.body.name,
    location: req.body.location,
    capacity: req.body.capacity,
  });
  try {
    const newTheatre = await theatre.save();
    res.status(201).json(newTheatre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a Theatre document by ID
router.patch("/theatres/:id", getTheatre, async (req, res) => {
  if (req.body.name != null) {
    res.theatre.name = req.body.name;
  }
  if (req.body.location != null) {
    res.theatre.location = req.body.location;
  }
  if (req.body.capacity != null) {
    res.theatre.capacity = req.body.capacity;
  }
  try {
    const updatedTheatre = await res.theatre.save();
    res.json(updatedTheatre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a Theatre document by ID
router.delete("/theatres/:id", getTheatre, async (req, res) => {
  try {
    await res.theatre.remove();
    res.json({ message: "Theatre deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single Theatre document by ID
async function getTheatre(req, res, next) {
  let theatre;
  try {
    theatre = await Theatre.findById(req.params.id);
    if (theatre == null) {
      return res.status(404).json({ message: "Theatre not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.theatre = theatre;
  next();
}

// Export the router
module.exports = router;
