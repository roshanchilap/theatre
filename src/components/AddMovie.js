import React, { useState } from "react";
import "../styles/AddMovie.css";
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    description: "",
    duration: "",
    rating: "",
    poster: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    if (response.ok) {
      navigate("/");
      console.log("Movie added successfully!");
    } else {
      console.error("Failed to add movie.");
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
          />
        </label>
        <label>
          Poster URL:
          <input
            type="text"
            name="poster"
            value={movie.poster}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
