import React from "react";

import "./App.css";
import AddMovie from "./components/AddMovie";
import Nav from "./components/Nav";
import DeleteMovie from "./components/DeleteMovie";
import MovieDetails from "./components/MovieDetails";
import AddShowTime from "./components/AddShowTime";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<MovieDetails />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/deletemovie" element={<DeleteMovie />} />
          <Route path="/addshowtime" element={<AddShowTime />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
