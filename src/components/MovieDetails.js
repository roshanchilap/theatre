import React, { useState, useEffect } from "react";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="MovieDetails">
      {movies.map((movie) => (
        <div key={movie.id} className="MovieCard">
          <img src={movie.poster} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>Genre: {movie.genre}</p>

          <p>Description: {movie.description}</p>
          <p>Duration: {movie.duration} hours</p>
          <p>Rating: {movie.rating}/10</p>
        </div>
      ))}
    </div>
  );
}

export default MovieDetails;
