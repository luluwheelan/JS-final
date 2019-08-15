import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/movies/${props.match.params.id}`)
      .then(result => setInputs(result.data))
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/movies/update", {
      id: props.match.params.id,
      ...inputs
    })
      .then(res => setRedirect(true))
      .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    event.persist();
    const { name, value } = event.target;

    setInputs(inputs => {
      return {
        ...inputs,
        [name]: value
      };
    });
  }

  if (redirect) return <Redirect to="/" />;

  return (
    <div className="container">
      <header>
        <h1>Edit Moive</h1>
      </header>
      <div>
        <form action="/" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              required="required"
              onChange={handleInputChange}
              name="title"
              defaultValue={input.title}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              name="description"
              required="required"
              onChange={handleInputChange}
              defaultValue={inputs.description}
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
              defaultValue={inputs.price}
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <select
              className="form-control"
              name="rating"
              required="required"
              type="number"
              onChange={handleInputChange}
              defaultValue={inputs.rating}
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

export default Edit;
