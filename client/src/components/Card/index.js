import React, { Component } from "react";
import "./style.scss";

class index extends Component {
  render() {
    return (
      <div className="card-container">
        <img
          className="images-about"
          src={this.props.img}
          alt="sublimation memories"
        />
      </div>
    );
  }
}

export default index;
