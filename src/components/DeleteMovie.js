import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DeleteMovie.css";

function DeleteMovie() {
  const [movieId, setMovieId] = useState("");
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((response) => setMovieList(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteMovie = async () => {
    try {
      if (!movieId) {
        console.log("Please select a movie to delete");
        return;
      }
      await axios.delete(`http://localhost:5000/movies/${movieId}`);
      navigate("/");
      console.log("Movie deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Delete Movie</h2>
      <form>
        <label htmlFor="movieId">Select Movie:</label>
        <select
          id="movieId"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        >
          <option value={null}>-- Select a movie --</option>
          {movieList.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteMovie}>Delete</button>
      </form>
    </div>
  );
}

export default DeleteMovie;
