import React, { Component } from "react";
import "./style.scss";

class index extends Component {
  constructor() {
    super();
    this.state = {
      bg: "./images/cartera-front__picTemplate.png",
    };
  }

  setBg = ({ currentTarget }) => {
    let bgValue = currentTarget.value;

    this.setState({
      bg:
        bgValue === "1"
          ? "./images/bg-pencilCase/pencilCaseBg1.png"
          : bgValue === "2"
          ? "./images/bg-pencilCase/pencilCaseBg2.png"
          : bgValue === "3"
          ? "./images/bg-pencilCase/pencilCaseBg3.png"
          : bgValue === "4"
          ? "./images/bg-pencilCase/pencilCaseBg4.png"
          : null,
    });
  };

  render() {
    return (
      <div>
        {this.props.pencilCaseActive ? (
          <div>
            <div className="cartera-container">
              <img
                className="pencilCase-image-holder"
                src={this.state.bg}
                alt="pencil case"
              />
            </div>
            <button onClick={this.setBg} value="1">
              Background 1
            </button>
            <button onClick={this.setBg} value="2">
              Background 2
            </button>
            <button onClick={this.setBg} value="3">
              Background 3
            </button>
            <button onClick={this.setBg} value="4">
              Background 4
            </button>
          </div>
        ) : (
          <img src={this.props.img} alt="pencil case" />
        )}
      </div>
    );
  }
}

export default index;
