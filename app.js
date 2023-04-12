const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const movieRoutes = require("./routes/Movie");
const showtimeRoutes = require("./routes/showTime");
const theatresRoutes = require("./routes/theatre");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURL = process.env.mongoURL;
app.use(cors());
app.use(bodyParser.json());

let db;

const mongoose = require("mongoose");
mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Theatre Management System API");
});

// Use the movie and showtime routes
app.use(movieRoutes);
app.use(showtimeRoutes);
app.use(theatresRoutes);

app.get("/shows", async (req, res) => {
  const shows = await db.collection("shows").find().toArray();
  res.json(shows);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
