import React, { Component } from "react";
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
      // css
      marginTopPhoto: 10,
      marginTopPhotoSmall: -60,
      marginRightPhoto: 35,
      width: 10,
      marginTop: 10,
      marginTopSmall: -30,
      marginRight: -10,
      marginRightSmall: -40,
      fontSize: 20,
      color: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.imagePreviewUrl !== prevProps.imagePreviewUrl) {
      this.setState({
        marginTopPhoto: 10,
        marginRightPhoto: 35,
        width: 10,
      });
    }
  }

  // PHOTO TRANSFORM CONTROLS
  movePhotoUp = () => {
    this.setState((prevState) => ({
      marginTopPhoto: prevState.marginTopPhoto + -2,
      marginTopPhotoSmall: prevState.marginTopPhotoSmall + -2,
    }));
  };

  movePhotoDown = () => {
    this.setState((prevState) => ({
      marginTopPhoto: prevState.marginTopPhoto + 2,
      marginTopPhotoSmall: prevState.marginTopPhotoSmall + 2,
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
      marginRight: prevState.marginRight + 2,
    }));
  };

  moveTextRight = () => {
    this.setState((prevState) => ({
      marginRight: prevState.marginRight - 2,
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

  render() {
    return (
      <div>
        <img
          className="cosmetic-bag-front"
          src={this.props.img}
          alt="cosmetic-bag"
        />
        {this.props.imagePreviewUrl !== "" ? (
          <div>
            <img
              style={{
                width: this.state.width + "%",
                left: this.state.marginRightPhoto + "%",
                marginTop: this.state.marginTopPhoto + "px",
              }}
              className="img-preview__cosmeticBag--small-screens"
              src={this.props.imagePreviewUrl}
              alt="shirt"
            />
            <img
              style={{
                width: this.state.width + "%",
                left: this.state.marginRightPhoto + "%",
                marginTop: this.state.marginTopPhoto + "px",
              }}
              className="img-preview__cosmeticBag"
              src={this.props.imagePreviewUrl}
              alt="shirt"
            />
            <div className="photo-controls-container">
              <div>
                <h3 className="photo-controls-container__heading">
                  <span role="img" aria-label="paw">
                    &#128247;
                  </span>{" "}
                  Transform Photo
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
          </div>
        ) : null}

        <div className="text-container-cosmeticBag-parent">
          <div className="text-on-cosmeticBag">
            <h3
              className="text-on-cosmeticBag__container text-center"
              style={{
                marginTop: this.state.marginTop + "px",
                marginRight: this.state.marginRight + "px",
                fontSize: this.state.fontSize + "px",
                color: this.state.color,
              }}
            >
              {this.props.textOnMugs}
            </h3>
            <h3
              className="text-on-cosmeticBag__container--small-screens text-center"
              style={{
                marginTop: this.state.marginTop + "px",
                marginRight: this.state.marginRight + "px",
                fontSize: this.state.fontSize + "px",
                color: this.state.color,
              }}
            >
              {this.props.textOnMugs}
            </h3>
          </div>
        </div>

        {this.props.textOnMugs && this.props.btnConfirmed ? (
          // TEXT FORMAT CONTROL/////////////////////
          <div className="cosmeticBag-container-backs">
            <div className="text-controls-container-cosmeticBag">
              <h3 className="text-controls-container-cosmeticBag__heading">
                Text Control
              </h3>
              <div className="move-text-btns-container-cosmeticBag text-center">
                <Select
                  menuPlacement="bottom"
                  placeholder="Text color"
                  className=""
                  onChange={this.onSelectedChangeColor}
                  options={optionsColor}
                />
              </div>
              <div className="text-controls-container-cosmeticBag-box">
                <p className="size-title-cosmeticBag__move text-center">Move</p>
                <p className="size-title-cosmeticBag__size text-center">Size</p>

                <img
                  onClick={this.moveTextUp}
                  className="move-text-btns-cosmeticBag move-text-btns-cosmeticBag__up"
                  src="./images/up-btn.png"
                  alt="up"
                />
                <img
                  onClick={this.moveTextRight}
                  className="move-text-btns-cosmeticBag move-text-btns-cosmeticBag__right"
                  src="./images/right-btn.png"
                  alt="right"
                />
                <img
                  onClick={this.moveTextDown}
                  className="move-text-btns-cosmeticBag move-text-btns-cosmeticBag__down"
                  src="./images/down-btn.png"
                  alt="down"
                />
                <img
                  onClick={this.moveTextLeft}
                  className="move-text-btns-cosmeticBag move-text-btns-cosmeticBag__left"
                  src="./images/left-btn.png"
                  alt="left"
                />
                <img
                  onClick={this.increaseFont}
                  className="move-text-btns-cosmeticBag move-text-btns-cosmeticBag__more"
                  src="./images/plus-btn.png"
                  alt="plus"
                />
                <img
                  onClick={this.decreaseFont}
                  className="move-text-btns-cosmeticBag move-text-btns-cosmeticBag__less"
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
