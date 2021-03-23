import React from "react";
// import api from "../../api";

class Secret extends React.Component {
  state = {
    secret: "",
    message: null,
  };

  componentDidMount() {
    // GET SECRET
  }

  render() {
    return (
      <div className="Secret">
        <h2>Secret</h2>
        <div className="result">{this.state.secret}</div>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Secret;
