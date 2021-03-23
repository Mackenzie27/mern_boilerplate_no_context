import React from "react";
import api from "../../api";

class AddCountry extends React.Component {
  state = {
    name: "",
    capitals: "",
    area: "",
    description: "",
    message: null,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      name: this.state.name,
      capitals: this.state.capitals,
      area: this.state.area,
      description: this.state.description,
    };

    api
      .addCountry(data)
      .then((result) => {
        console.log("SUCCESS!");
        this.setState({
          message: `Your country '${this.state.name}' has been created`,
          name: "",
          capitals: "",
          area: "",
          description: "",
        });
        setTimeout(() => {
          this.setState({ message: null });
        }, 2000);
      })
      .catch((err) => this.setState({ message: err.toString() }));
  };

  render() {
    return (
      <div className="AddCountry">
        <h2>Add country</h2>
        <form onSubmit={this.handleSubmit}>
          Name:{" "}
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />{" "}
          <br />
          Capitals:{" "}
          <input
            type="text"
            value={this.state.capitals}
            name="capitals"
            onChange={this.handleChange}
          />{" "}
          <br />
          Area:{" "}
          <input
            type="number"
            value={this.state.area}
            name="area"
            onChange={this.handleChange}
          />{" "}
          <br />
          Description:{" "}
          <textarea
            value={this.state.description}
            name="description"
            cols="30"
            rows="10"
            onChange={this.handleChange}
          />{" "}
          <br />
          <button>Create country</button>
        </form>
        {this.state.message && <div className="info">{this.state.message}</div>}
      </div>
    );
  }
}

export default AddCountry;
