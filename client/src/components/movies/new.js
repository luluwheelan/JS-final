import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleInputChange(event) {
    event.persist();
    const { name, value } = event.target;

    setInputs(inputs => {
      inputs[name] = value;
      return inputs;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/movies", inputs)
      .then(resp => setRedirect(true))
      .catch(err => console.log(err));
  }

  if (redirect) return <Redirect to="/" />;

  return (
    <div className="container">
      <header>
        <h1>New Movie</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              name="description"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              className="form-control"
              name="price"
              required
              type="number"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <select
              className="form-control"
              name="rating"
              required
              type="number"
              onChange={handleInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;
