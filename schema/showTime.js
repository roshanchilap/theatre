const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Showtime = mongoose.model("Showtime", showtimeSchema);

module.exports = Showtime;
