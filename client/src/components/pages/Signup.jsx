import React from "react";
import api from "../../api";

class Signup extends React.Component {
  state = {
    username: "",
    name: "",
    password: "",
    message: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    };

    api
      .signup(data)
      .then((result) => {
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch((err) => this.setState({ message: err.toString() }));
  };

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          Username:{" "}
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
          />{" "}
          <br />
          Name:{" "}
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />{" "}
          <br />
          Password:{" "}
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />{" "}
          <br />
          <button>Signup</button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Signup;
