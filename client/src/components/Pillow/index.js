import React, { Component } from "react";
import Select from "react-select";
import ButtonFont from "../FontButton";

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

    this.state = {
      marginTopPhoto: 10,
      marginRightPhoto: 46.6,
      fontSize: 30,
      fontSizeSmallScreens: 15,

      marginTop: 10,
      marginRight: 45,
      width: 7,

      fontType: "Arial, Helvetica, sans-serif",
      font1: "Arial, Helvetica, sans-serif",
      font2: '"Pangolin", cursive',
      font3: "'Notable', sans-serif",
      font4: '"Piedra", cursive',
      font5: "'Yanone Kaffeesatz', sans-serif",
      font6: "'Orbitron', sans-serif",
      font7: '"Courier New", Courier, monospace',
      font8: "Brush Script MT",
      font9: "'Permanent Marker', cursive",
      font10: "'Indie Flower', cursive",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.imagePreviewUrl !== prevProps.imagePreviewUrl) {
      this.setState({
        marginTopPhoto: 10,
        marginRightPhoto: 46.6,
        width: 7,
      });
    }
  }

  // PHOTO TRANSFORM CONTROLS
  movePhotoUp = () => {
    this.setState((prevState) => ({
      marginTopPhoto: prevState.marginTopPhoto + -2,
    }));
  };

  movePhotoDown = () => {
    this.setState((prevState) => ({
      marginTopPhoto: prevState.marginTopPhoto + 2,
    }));
  };

  movePhotoLeft = () => {
    this.setState((prevState) => ({
      marginRightPhoto: prevState.marginRightPhoto - 0.5,
    }));
  };

  movePhotoRight = () => {
    this.setState((prevState) => ({
      marginRightPhoto: prevState.marginRightPhoto + 0.5,
    }));
  };

  increasePhotoSize = () => {
    this.setState((prevState) => ({
      width: prevState.width + 0.5,
    }));
  };

  decreasePhotoSize = () => {
    this.setState((prevState) => ({
      width: prevState.width - 0.5,
    }));
  };

  // TEXT TRANSFORM CONTROLS
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
      fontSizeSmallScreens: prevState.fontSizeSmallScreens + 2,
    }));
  };

  decreaseFont = async () => {
    await this.setState((prevState) => ({
      // counterFontSize: this.state.counterFontSize + 2,
      fontSize: prevState.fontSize - 2,
      fontSizeSmallScreens: prevState.fontSizeSmallScreens - 2,
    }));
  };

  font1 = async () => {
    await this.setState({
      fontType: this.state.font1,
    });
  };
  font2 = async () => {
    await this.setState({
      fontType: this.state.font2,
    });
  };
  font3 = async () => {
    await this.setState({
      fontType: this.state.font3,
    });
  };
  font4 = async () => {
    await this.setState({
      fontType: this.state.font4,
    });
  };
  font5 = async () => {
    await this.setState({
      fontType: this.state.font5,
    });
  };
  font6 = async () => {
    await this.setState({
      fontType: this.state.font6,
    });
  };
  font7 = async () => {
    await this.setState({
      fontType: this.state.font7,
    });
  };
  font8 = async () => {
    await this.setState({
      fontType: this.state.font8,
    });
  };
  font9 = async () => {
    await this.setState({
      fontType: this.state.font9,
    });
  };
  font10 = async () => {
    await this.setState({
      fontType: this.state.font10,
    });
  };

  render() {
    return (
      <div className="image-product-container-pillow text-center">
        {this.props.imagePreviewUrl && this.props.photoControlPillow ? (
          <div className="photo-controls-container">
            <h3 className="photo-controls-container__heading">
              <span role="img" aria-label="paw">
                &#128247;
              </span>{" "}
              Transform Photo
            </h3>
            <div className="photo-controls-container-box">
              <p className="size-title-pillow__move text-center">Move</p>
              <p className="size-title-pillow__size text-center">Size</p>

              <img
                onClick={this.movePhotoUp}
                className="move-photo-btns move-photo-btns__up"
                src="./images/up-btn.png"
                alt="up"
              />
              <img
                onClick={this.movePhotoRight}
                className="move-photo-btns move-photo-btns__right"
                src="./images/right-btn.png"
                alt="right"
              />
              <img
                onClick={this.movePhotoDown}
                className="move-photo-btns move-photo-btns__down"
                src="./images/down-btn.png"
                alt="down"
              />
              <img
                onClick={this.movePhotoLeft}
                className="move-photo-btns move-photo-btns__left"
                src="./images/left-btn.png"
                alt="left"
              />
              <img
                onClick={this.increasePhotoSize}
                className="move-photo-btns move-photo-btns__more"
                src="./images/plus-btn.png"
                alt="plus"
              />
              <img
                onClick={this.decreasePhotoSize}
                className="move-photo-btns move-photo-btns__less"
                src="./images/minus-btn.png"
                alt="minus"
              />
            </div>
          </div>
        ) : null}
        <button
          onClick={this.props.toggleDesignSquare}
          className="hide-x-pillow"
        >
          Max Area Hide / Show &#8595;
        </button>
        {!this.props.showGuide ? (
          <img
            className="img-product__pillow"
            src="./images/pillowcase-markings.png"
            alt="pillow empty"
          />
        ) : (
          <img
            className="img-product__pillow"
            src={this.props.img}
            alt="pillow"
          />
        )}

        {this.props.imagePreviewUrl !== "" ? (
          <div className="img-preview-pillow-container">
            <img
              style={{
                width: this.state.width + "%",
                left: this.state.marginRightPhoto + "%",
                marginTop: this.state.marginTopPhoto + "px",
              }}
              className="product-img-preview-pillow-small-screens"
              src={this.props.imagePreviewUrl}
              alt="shirt"
            />
            <img
              style={{
                width: this.state.width + "%",
                left: this.state.marginRightPhoto + "%",
                marginTop: this.state.marginTopPhoto + "px",
              }}
              className="product-img-preview-pillow"
              src={this.props.imagePreviewUrl}
              alt="shirt"
            />
          </div>
        ) : null}

        <div className="text-container-pillows-parent">
          <div className="text-on-pillows">
            <h3
              className="text-on-pillows__container text-center"
              style={{
                marginTop: this.state.marginTop + "px",
                marginLeft: this.state.marginRight + "px",
                fontSize: this.state.fontSize + "px",
                color: this.state.color,
                fontFamily: this.state.fontType,
              }}
            >
              {this.props.textOnMugs}
            </h3>
          </div>
        </div>
        <div className="text-container-pillows-parent-small-screens">
          <div className="text-on-pillows">
            <h3
              className="text-on-pillows__container text-center"
              style={{
                marginTop: this.state.marginTop + "px",
                marginLeft: this.state.marginRight + "px",
                fontSize: this.state.fontSize + "px",
                color: this.state.color,
                fontFamily: this.state.fontType,
              }}
            >
              {this.props.textOnMugs}
            </h3>
          </div>
        </div>
        <div className="text-container-pillows-parent-Xsmall-screens">
          <div className="text-on-pillows">
            <h3
              className="text-on-pillows__container text-center"
              style={{
                marginTop: this.state.marginTop + "px",
                marginLeft: this.state.marginRight + "px",
                fontSize: this.state.fontSizeSmallScreens + "px",
                color: this.state.color,
                fontFamily: this.state.fontType,
              }}
            >
              {this.props.textOnMugs}
            </h3>
          </div>
        </div>
        {this.props.textOnMugs && this.props.textFormatOptions ? (
          // TEXT FORMAT CONTROL/////////////////////
          <div className="pillow-container-backs">
            <div className="text-controls-container-pillow">
              <h3 className="text-controls-container-pillow__heading">
                Text Control
              </h3>
              <div className="move-text-btns-container-pillows text-center">
                <ButtonFont
                  fontType={this.state.fontType}
                  font1={this.font1}
                  font2={this.font2}
                  font3={this.font3}
                  font4={this.font4}
                  font5={this.font5}
                  font6={this.font6}
                  font7={this.font7}
                  font8={this.font8}
                  font9={this.font9}
                  font10={this.font10}
                />
                <Select
                  isSearchable={false}
                  menuPlacement="bottom"
                  placeholder="Text color"
                  className=""
                  onChange={this.onSelectedChangeColor}
                  options={optionsColor}
                />
              </div>
              <div className="text-controls-container-pillow-box">
                <p className="size-title-pillow__move text-center">Move</p>
                <p className="size-title-pillow__size text-center">Size</p>

                <img
                  onClick={this.moveTextUp}
                  className="move-text-btns-pillow move-text-btns-pillow__up"
                  src="./images/up-btn.png"
                  alt="up"
                />
                <img
                  onClick={this.moveTextRight}
                  className="move-text-btns-pillow move-text-btns-pillow__right"
                  src="./images/right-btn.png"
                  alt="right"
                />
                <img
                  onClick={this.moveTextDown}
                  className="move-text-btns-pillow move-text-btns-pillow__down"
                  src="./images/down-btn.png"
                  alt="down"
                />
                <img
                  onClick={this.moveTextLeft}
                  className="move-text-btns-pillow move-text-btns-pillow__left"
                  src="./images/left-btn.png"
                  alt="left"
                />
                <img
                  onClick={this.increaseFont}
                  className="move-text-btns-pillow move-text-btns-pillow__more"
                  src="./images/plus-btn.png"
                  alt="plus"
                />
                <img
                  onClick={this.decreaseFont}
                  className="move-text-btns-pillow move-text-btns-pillow__less"
                  src="./images/minus-btn.png"
                  alt="minus"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default index;
