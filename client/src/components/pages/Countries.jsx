import React from "react";
import api from "../../api";

class Countries extends React.Component {
  state = {
    countries: [],
  };

  componentDidMount() {
    api
      .getCountries()
      .then((data) => {
        this.setState({ countries: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="Countries">
        <h2>List of countries</h2>
        {this.state.countries.map((c) => (
          <li key={c._id}>{c.name}</li>
        ))}
      </div>
    );
  }
}

export default Countries;
