import React, { Component } from "react";
import ButtonFont from "../FontButton";

import "./style.scss";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorBone: "",

      //css
      marginTopPhoto: 1,
      marginRightPhoto: 4,
      width: 90,

      //css text
      marginTop: 10,
      marginRight: 40,
      fontSize: 150,
      fontSizeSmallScreens: 120,
      fontSizeXSmallScreens: 100,

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
        marginTopPhoto: 1,
        marginRightPhoto: 4,
        width: 90,
      });
    }
  }

  // PHOTO TRANSFORM CONTROLS
  movePhotoUp = () => {
    this.setState((prevState) => ({
      marginTopPhoto: prevState.marginTopPhoto + -5,
    }));
    console.log(this.state.marginTopPhoto);
  };

  movePhotoDown = () => {
    this.setState((prevState) => ({
      marginTopPhoto: prevState.marginTopPhoto + 5,
    }));
  };

  movePhotoLeft = () => {
    this.setState((prevState) => ({
      marginRightPhoto: prevState.marginRightPhoto - 5,
    }));
  };

  movePhotoRight = () => {
    this.setState((prevState) => ({
      marginRightPhoto: prevState.marginRightPhoto + 5,
    }));
  };

  increasePhotoSize = () => {
    this.setState((prevState) => ({
      width: prevState.width + 2,
    }));
  };

  decreasePhotoSize = () => {
    this.setState((prevState) => ({
      width: prevState.width - 2,
    }));
  };

  // TEXT TRANSFORM CONTROLS

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
      fontSize: prevState.fontSize + 10,
      fontSizeSmallScreens: prevState.fontSizeSmallScreens + 10,
      fontSizeXSmallScreens: prevState.fontSizeXSmallScreens + 10,
    }));
  };

  decreaseFont = async () => {
    await this.setState((prevState) => ({
      // counterFontSize: this.state.counterFontSize + 2,
      fontSize: prevState.fontSize - 10,
      fontSizeSmallScreens: prevState.fontSizeSmallScreens - 10,
      fontSizeXSmallScreens: prevState.fontSizeXSmallScreens - 10,
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
      <div className="petTagBone-main-container">
        {/* PHOTO TRANSFORM CONTROLS */}
        {this.props.imagePreviewUrl && this.props.photoControlPetTagBone ? (
          <div>
            <div className="photo-controls-container">
              <h3 className="photo-controls-container__heading">
                <span role="img" aria-label="paw">
                  &#128247;
                </span>{" "}
                Photo Control
              </h3>
              <div className="photo-controls-container-box">
                <p className="size-title__move text-center">Move</p>
                <p className="size-title__size text-center">Size</p>

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
          </div>
        ) : null}
        {this.props.btnConfirmed ? (
          <div className="text-controls-container">
            <h3 className="text-controls-container__heading">
              <span role="img" aria-label="paw">
                &#128062;
              </span>{" "}
              Name Control
            </h3>
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
            <div className="text-controls-container-box">
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

        <div className="img-product__petTagBone-wrapper">
          <img
            className="img-product__petTagBone"
            src={this.props.img}
            alt="petTagBone"
          />
          {this.props.boneColor === "blue" ? (
            <img
              className="img-product__petTagBone"
              src={this.props.img}
              alt="petTagBone"
            />
          ) : null}
          {this.props.boneColor === "pink" ? (
            <img
              className="img-product__petTagBone"
              src="./images/pet-tag-bone-pink.png"
              alt="petTagBone"
            />
          ) : null}
          {this.props.boneColor === "yellow" ? (
            <img
              className="img-product__petTagBone"
              src="./images/pet-tag-bone-yellow.png"
              alt="petTagBone"
            />
          ) : null}
          {this.props.boneColor === "green" ? (
            <img
              className="img-product__petTagBone"
              src="./images/pet-tag-bone-green.png"
              alt="petTagBone"
            />
          ) : null}
          {this.props.boneColor === "brown" ? (
            <img
              className="img-product__petTagBone"
              src="./images/pet-tag-bone-brown.png"
              alt="petTagBone"
            />
          ) : null}

          <h4
            style={{
              marginTop: this.state.marginTop + "px",
              marginLeft: this.state.marginRight + "px",
              fontSize: this.state.fontSizeXSmallScreens + "%",
              color: this.state.color,
              fontFamily: this.state.fontType,
            }}
            className="petTagBone-info petTagBone-info__petName--Xsmall-screens"
          >
            {this.props.petName}
          </h4>
          <h4
            style={{
              marginTop: this.state.marginTop + "px",
              marginLeft: this.state.marginRight + "px",
              fontSize: this.state.fontSizeSmallScreens + "%",
              color: this.state.color,
              fontFamily: this.state.fontType,
            }}
            className="petTagBone-info petTagBone-info__petName--small-screens"
          >
            {this.props.petName}
          </h4>
          <h4
            style={{
              marginTop: this.state.marginTop + "px",
              marginLeft: this.state.marginRight + "px",
              fontSize: this.state.fontSize + "%",
              color: this.state.color,
              fontFamily: this.state.fontType,
            }}
            className="petTagBone-info petTagBone-info__petName"
          >
            {this.props.petName}
          </h4>
          <h4 className="petTagBone-info petTagBone-info__phone">
            {this.props.phone}
          </h4>
        </div>
        {this.props.imagePreviewUrl !== "" ? (
          <div className="img-preview-petTagBone-wrapper">
            <img
              style={{
                width: this.state.width + "%",
                marginLeft: this.state.marginRightPhoto + "%",
                marginTop: this.state.marginTopPhoto + "px",
              }}
              className="product-img-preview-petTagBone"
              src={this.props.imagePreviewUrl}
              alt="bone"
            />
          </div>
        ) : (
          <div className="img-preview-petTagBone-wrapper">
            <img
              style={{
                width: this.state.width + "%",
                marginLeft: this.state.marginRightPhoto + "%",
                marginTop: this.state.marginTopPhoto + "px",
              }}
              className="product-img-preview-petTagBone"
              src="./images/elsa.jpg"
              alt="bone"
            />
          </div>
        )}
      </div>
    );
  }
}

export default index;
