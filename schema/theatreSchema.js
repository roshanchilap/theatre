// Import dependencies
const express = require("express");
const mongoose = require("mongoose");

// Define Theatre schema
const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

// Create Theatre model
const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
