import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Index() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Axios.get("/api/movies")
      .then(result => setMovies(result.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Movies Here</h1>
      </header>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>
                  <Link to={`/${movie._id}`}>{movie.title}</Link>
                </td>
                <td>{movie.description}</td>
                <td>{movie.price}</td>
                <td>{movie.rating}</td>
                <td>
                  <Link to={`/${movie._id}/edit`}>Edit</Link> |
                  <Link to={`/${movie._id}/destroy`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
