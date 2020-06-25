import React, { Component, Fragment } from "react";
import Select from "react-select";

import "./style.scss";

let optionsColor = [
  {
    value: "black",
    label: "Black",
  },
  {
    value: "white",
    label: "White",
  },
  {
    value: "rgb(255, 204, 255)",
    label: "Pink",
  },
  {
    value: "blue",
    label: "Blue",
  },
  {
    value: "green",
    label: "Green",
  },
  {
    value: "yellow",
    label: "Yellow",
  },
  {
    value: "red",
    label: "Red",
  },
  {
    value: "purple",
    label: "Purple",
  },
  {
    value: "orange",
    label: "Orange",
  },
];

class index extends Component {
  constructor(props) {
    super(props);

    // this.textRef = createRef();

    this.state = {
      // css
      marginTop: 10,
      marginRight: -10,
      fontSize: 30,
      color: "",
    };
  }

  onSelectedChangeColor = async (value) => {
    await this.setState({
      color: value.value,
    });
  };

  moveTextUp = () => {
    this.setState((prevState) => ({
      marginTop: prevState.marginTop + -2,
    }));
  };

  moveTextDown = () => {
    this.setState((prevState) => ({
      marginTop: prevState.marginTop + 2,
    }));
  };

  moveTextLeft = () => {
    this.setState((prevState) => ({
      marginRight: prevState.marginRight - 2,
    }));
  };

  moveTextRight = () => {
    this.setState((prevState) => ({
      marginRight: prevState.marginRight + 2,
    }));
  };

  increaseFont = async () => {
    await this.setState((prevState) => ({
      // counterFontSize: this.state.counterFontSize + 2,
      fontSize: prevState.fontSize + 2,
    }));
  };

  decreaseFont = async () => {
    await this.setState((prevState) => ({
      // counterFontSize: this.state.counterFontSize + 2,
      fontSize: prevState.fontSize - 2,
    }));
  };

  render() {
    return (
      <Fragment>
        <div className="mugs-container">
          <p className="product-sides product-sides__a">Side A &#8594;</p>
          <div className="mugs-container__front">
            <div>
              <img
                className="product-img "
                src={this.props.productImg}
                alt="product"
              />
              {this.props.imagePreviewUrl.length > 0 ? (
                <img
                  className="product-img-preview-mug"
                  src={this.props.imagePreviewUrl}
                  alt="temp"
                />
              ) : null}
            </div>
          </div>

          <p className="product-sides product-sides__b">&#8592; Side B</p>
          <div className="mugs-container__back">
            <img
              className="product-img__back "
              src={this.props.productImgBack}
              alt="product"
            />
            <div className="text-on-mugs">
              <h3
                className="text-on-mugs__container text-center"
                style={{
                  marginTop: this.state.marginTop + "px",
                  marginLeft: this.state.marginRight + "px",
                  fontSize: this.state.fontSize + "px",
                  color: this.state.color,
                }}
              >
                {this.props.textOnMugs}
              </h3>
            </div>
            {this.props.textOnMugs && this.props.textFormatOptions ? (
              // TEXT FORMAT CONTROL/////////////////////

              <div className="text-controls-container-mugs">
                <h3 className="text-controls-container-mugs__heading">
                  Text Control
                </h3>
                <div className="move-text-btns-container-mug text-center">
                  <Select
                    isSearchable={false}
                    menuPlacement="bottom"
                    placeholder="Text color"
                    className="color-text-mugs"
                    onChange={this.onSelectedChangeColor}
                    options={optionsColor}
                  />
                </div>
                <div className="text-controls-container-mugs-box">
                  <p className="size-title__move text-center">Move</p>
                  <p className="size-title__size text-center">Size</p>

                  <img
                    onClick={this.moveTextUp}
                    className="move-text-btns move-text-btns__up"
                    src="./images/up-btn.png"
                    alt="up"
                  />
                  <img
                    onClick={this.moveTextRight}
                    className="move-text-btns move-text-btns__right"
                    src="./images/right-btn.png"
                    alt="right"
                  />
                  <img
                    onClick={this.moveTextDown}
                    className="move-text-btns move-text-btns__down"
                    src="./images/down-btn.png"
                    alt="down"
                  />
                  <img
                    onClick={this.moveTextLeft}
                    className="move-text-btns move-text-btns__left"
                    src="./images/left-btn.png"
                    alt="left"
                  />
                  <img
                    onClick={this.increaseFont}
                    className="move-text-btns move-text-btns__more"
                    src="./images/plus-btn.png"
                    alt="plus"
                  />
                  <img
                    onClick={this.decreaseFont}
                    className="move-text-btns move-text-btns__less"
                    src="./images/minus-btn.png"
                    alt="minus"
                  />
                </div>
              </div>
            ) : null}
            {/* BACKGROUND IMAGE MUGS */}
            {this.props.bg.length > 0 ? (
              <div className="bg-container-mugs text-center">
                <img className="bg-image-mug" src={this.props.bg} alt="bg" />
              </div>
            ) : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default index;
