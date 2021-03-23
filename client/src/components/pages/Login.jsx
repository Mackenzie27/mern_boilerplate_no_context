import React from "react";
import api from "../../api";

class Login extends React.Component {
  state = {
    password: "",
    username: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    api
      .login(this.state.username, this.state.password)
      .then((result) => {
        // Find a way to log the user :)
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch((err) => {
        console.log(err);
        this.setState({ message: err.toString() });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={this.state.name}
            onChange={this.handleChange}
          />{" "}
          <br />
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <br />
          <button>Login</button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Login;
