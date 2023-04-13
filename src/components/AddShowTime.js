import React, { useState, useEffect } from "react";
import axios from "axios";

function AddShowtime() {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [formData, setFormData] = useState({
    movie: "",
    theatre: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
  });

  useEffect(() => {
    // Fetch movies and theatres from backend API
    axios
      .get("http://localhost:5000/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error));
    axios
      .get("http://localhost:5000/theatres")
      .then((response) => setTheatres(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit new showtime data to backend API
    axios
      .post("http://localhost:5000/showtimes", formData)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Movie:
        <select
          name="movie"
          value={formData.movie}
          onChange={handleInputChange}
        >
          <option value="">Select a movie</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Theatre:
        <select
          name="theatre"
          value={formData.theatre}
          onChange={handleInputChange}
        >
          <option value="">Select a theatre</option>
          {theatres.map((theatre) => (
            <option key={theatre._id} value={theatre._id}>
              {theatre.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Date (DD/MM/YYYY):
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Start Time (HH:MMAM/PM):
        <input
          type="text"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        End Time (HH:MMAM/PM):
        <input
          type="text"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Add Showtime</button>
    </form>
  );
}

export default AddShowtime;
