import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addmovie">Add Movie</Link>
        </li>
        <li>
          <Link to="/deletemovie">Delete Movie</Link>
        </li>
        <li>
          <Link to="/addshowtime">Add ShowTime</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
