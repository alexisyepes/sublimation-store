import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-scroll";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallHolder: "",
      familyInput: "",
      familyNameConfirmed: "",
      avatarNumber: [],
      avatarImages: [],
      avatar: "",
      isFamilyName: false,
      errorMsg: "",
      lastnameEditMode: false,
      model1: false,
      model2: false,
      model3: false,
      chosenModel: false,
      showPreviewScreen: false,
      nameForFaceMask: "",
      namesArray: [],
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  faceMaskHandler = () => {
    this.setState({
      wallHolder: "faceMask",
    });
  };

  keyHolderHandler = () => {
    this.setState({
      wallHolder: "keyHolder",
    });
  };

  addAvatarHandler = async (e) => {
    e.preventDefault();

    let chosenImg;
    if (this.state.avatar === "1") {
      chosenImg = "./images/avatars/avatar1.png";
    } else if (this.state.avatar === "2") {
      chosenImg = "./images/avatars/avatar2.png";
    } else if (this.state.avatar === "3") {
      chosenImg = "./images/avatars/avatar3.png";
    } else if (this.state.avatar === "4") {
      chosenImg = "./images/avatars/avatar4.png";
    } else if (this.state.avatar === "5") {
      chosenImg = "./images/avatars/avatar5.png";
    } else if (this.state.avatar === "6") {
      chosenImg = "./images/avatars/avatar6.png";
    } else if (this.state.avatar === "7") {
      chosenImg = "./images/avatars/avatar7.png";
    } else if (this.state.avatar === "8") {
      chosenImg = "./images/avatars/avatar8.png";
    } else if (this.state.avatar === "9") {
      chosenImg = "./images/avatars/avatar9.png";
    } else if (this.state.avatar === "10") {
      chosenImg = "./images/avatars/avatar10.png";
    } else if (this.state.avatar === "11") {
      chosenImg = "./images/avatars/avatar11.png";
    } else if (this.state.avatar === "12") {
      chosenImg = "./images/avatars/avatar12.png";
    } else if (this.state.avatar === "13") {
      chosenImg = "./images/avatars/avatar13.png";
    } else if (this.state.avatar === "14") {
      chosenImg = "./images/avatars/avatar14.png";
    } else if (this.state.avatar === "15") {
      chosenImg = "./images/avatars/avatar15.png";
    } else if (this.state.avatar === "16") {
      chosenImg = "./images/avatars/avatar16.png";
    } else if (this.state.avatar === "17") {
      chosenImg = "./images/avatars/avatar17.png";
    } else if (this.state.avatar === "18") {
      chosenImg = "./images/avatars/avatar18.png";
    } else if (this.state.avatar === "19") {
      chosenImg = "./images/avatars/avatar19.png";
    } else if (this.state.avatar === "20") {
      chosenImg = "./images/avatars/avatar20.png";
    } else if (this.state.avatar === "21") {
      chosenImg = "./images/avatars/avatar21.png";
    } else if (this.state.avatar === "22") {
      chosenImg = "./images/avatars/avatar22.png";
    } else if (this.state.avatar === "23") {
      chosenImg = "./images/avatars/avatar23.png";
    } else if (this.state.avatar === "24") {
      chosenImg = "./images/avatars/avatar24.png";
    } else if (this.state.avatar === "25") {
      chosenImg = "./images/avatars/avatar25.png";
    } else if (this.state.avatar === "26") {
      chosenImg = "./images/avatars/avatar26.png";
    } else if (this.state.avatar === "27") {
      chosenImg = "./images/avatars/avatar27.png";
    } else if (this.state.avatar === "28") {
      chosenImg = "./images/avatars/avatar28.png";
    } else {
      return await this.setState({
        errorMsg: "Enter numbers only between 1 and 28!",
      });
    }
    await this.setState((prevState) => ({
      avatarNumber: [...prevState.avatarNumber, this.state.avatar],
      avatarImages: [...prevState.avatarImages, chosenImg],
      avatar: "",
      errorMsg: "",
    }));
  };

  addAvatarHandlerFaceMask = async (e) => {
    e.preventDefault();

    let chosenImg;
    if (this.state.avatar === "1") {
      chosenImg = "./images/elsa.jpg";
    } else if (this.state.avatar === "2") {
      chosenImg = "./images/avatars/avatar2.png";
    } else if (this.state.avatar === "3") {
      chosenImg = "./images/avatars/avatar3.png";
    } else if (this.state.avatar === "4") {
      chosenImg = "./images/avatars/avatar4.png";
    } else if (this.state.avatar === "5") {
      chosenImg = "./images/avatars/avatar5.png";
    } else if (this.state.avatar === "6") {
      chosenImg = "./images/avatars/avatar6.png";
    } else if (this.state.avatar === "7") {
      chosenImg = "./images/avatars/avatar7.png";
    } else if (this.state.avatar === "8") {
      chosenImg = "./images/avatars/avatar8.png";
    } else if (this.state.avatar === "9") {
      chosenImg = "./images/avatars/avatar9.png";
    } else if (this.state.avatar === "10") {
      chosenImg = "./images/avatars/avatar10.png";
    } else if (this.state.avatar === "11") {
      chosenImg = "./images/avatars/avatar11.png";
    } else if (this.state.avatar === "12") {
      chosenImg = "./images/avatars/avatar12.png";
    } else if (this.state.avatar === "13") {
      chosenImg = "./images/avatars/avatar13.png";
    } else if (this.state.avatar === "14") {
      chosenImg = "./images/avatars/avatar14.png";
    } else if (this.state.avatar === "15") {
      chosenImg = "./images/avatars/avatar15.png";
    } else if (this.state.avatar === "16") {
      chosenImg = "./images/avatars/avatar16.png";
    } else if (this.state.avatar === "17") {
      chosenImg = "./images/avatars/avatar17.png";
    } else if (this.state.avatar === "18") {
      chosenImg = "./images/avatars/avatar18.png";
    } else if (this.state.avatar === "19") {
      chosenImg = "./images/avatars/avatar19.png";
    } else if (this.state.avatar === "20") {
      chosenImg = "./images/avatars/avatar20.png";
    } else if (this.state.avatar === "21") {
      chosenImg = "./images/avatars/avatar21.png";
    } else if (this.state.avatar === "22") {
      chosenImg = "./images/avatars/avatar22.png";
    } else if (this.state.avatar === "23") {
      chosenImg = "./images/avatars/avatar23.png";
    } else if (this.state.avatar === "24") {
      chosenImg = "./images/avatars/avatar24.png";
    } else if (this.state.avatar === "25") {
      chosenImg = "./images/avatars/avatar25.png";
    } else if (this.state.avatar === "26") {
      chosenImg = "./images/avatars/avatar26.png";
    } else if (this.state.avatar === "27") {
      chosenImg = "./images/avatars/avatar27.png";
    } else if (this.state.avatar === "28") {
      chosenImg = "./images/avatars/avatar28.png";
    } else {
      return await this.setState({
        errorMsg: "Enter numbers only between 1 and 28!",
      });
    }
    await this.setState((prevState) => ({
      avatarNumber: [...prevState.avatarNumber, this.state.avatar],
      avatarImages: [...prevState.avatarImages, chosenImg],
      avatar: "",
      errorMsg: "",
    }));
  };

  removeAvatar = ({ currentTarget }) => {
    this.setState((prevState) => ({
      avatarImages: prevState.avatarImages.filter(
        (avatar) => avatar !== currentTarget.value
      ),
    }));
  };

  removeName = ({ currentTarget }) => {
    this.setState((prevState) => ({
      namesArray: prevState.namesArray.filter(
        (name) => name !== currentTarget.value
      ),
    }));
  };

  submitFamilyName = async (e) => {
    e.preventDefault();

    if (!this.state.familyInput) {
      return this.setState({
        errorMsg: "Type your Family Name to continue!",
      });
    }
    await this.setState({
      isFamilyName: true,
      familyNameConfirmed:
        this.state.familyInput.charAt(0).toUpperCase() +
        this.state.familyInput.slice(1),
      lastnameEditMode: false,
      errorMsg: "",
    });
  };

  modifyLastName = () => {
    this.setState({
      lastnameEditMode: true,
    });
  };

  model1ActiveHandler = () => {
    this.setState({
      model1: true,
      model2: false,
      model3: false,
    });
  };

  model2ActiveHandler = () => {
    this.setState({
      model2: true,
      model1: false,
      model3: false,
    });
  };

  model3ActiveHandler = () => {
    this.setState({
      model3: true,
      model1: false,
      model2: false,
    });
  };

  showPreviewScreenHandler = () => {
    if (this.state.avatarImages.length < 1) {
      return this.setState({
        errorMsg: "Oops! You must add your avatar numbers above",
      });
    }
    if (
      this.state.namesArray.length === 0 &&
      this.state.wallHolder === "faceMask"
    ) {
      return this.setState({
        errorMsg: "Oops! You forgot to add the names for the wall hooks",
      });
    }
    this.setState({
      showPreviewScreen: !this.state.showPreviewScreen,
      avatar: "",
      errorMsg: "",
      model1: false,
      model2: false,
      model3: false,
    });
  };

  submitFinalProduct = () => {
    this.props.screenShotFunction();
    this.setState({
      wallHolder: "",
      familyInput: "",
      familyNameConfirmed: "",
      avatarNumber: [],
      avatarImages: [],
      avatar: "",
      isFamilyName: false,
      errorMsg: "",
      modalToConfirm: false,
      lastnameEditMode: false,
      model1: false,
      model2: false,
      model3: false,
      chosenModel: false,
      showPreviewScreen: false,
    });
  };

  addNameHandler = async (e) => {
    e.preventDefault();
    if (this.state.nameForFaceMask === "") {
      return this.setState({
        errorMsg: "Field cannot be blank",
      });
    }
    await this.setState((prevState) => ({
      namesArray: [
        ...prevState.namesArray,
        this.state.nameForFaceMask.charAt(0).toUpperCase() +
          this.state.nameForFaceMask.slice(1),
      ],
      nameForFaceMask: "",
      errorMsg: "",
    }));
  };

  render() {
    let familyNameConfirmed = this.state.familyNameConfirmed;

    const nameForFaceMask = this.state.namesArray;
    const namesList =
      nameForFaceMask.length > 0
        ? nameForFaceMask.map((name, index) => {
            return (
              <span className="name-hook" key={index}>
                {index + 1}. {name}{" "}
                {this.state.showPreviewScreen ? null : (
                  <button
                    className="removeName-btn"
                    onClick={this.removeName}
                    value={name}
                  >
                    X
                  </button>
                )}
              </span>
            );
          })
        : null;

    const namesListForBg =
      nameForFaceMask.length > 0
        ? nameForFaceMask.map((name, index) => {
            return (
              <div key={index} className="name-hook-container">
                <p className="name-hook-on-bg">{name}</p>
                <img src="./images/hook-single.png" alt="wall hook" />
              </div>
            );
          })
        : null;

    const avatarsImages = this.state.avatarImages;
    const avatarImgList =
      avatarsImages.length > 0
        ? avatarsImages.map((img, index) => {
            return (
              <div key={index} className="avatarImg-btn-container">
                <img className="avatar-image" src={img} alt="avatar" />
                {this.state.showPreviewScreen ? null : (
                  <button
                    onClick={this.removeAvatar}
                    value={img}
                    className="removeAvatar"
                  >
                    x
                  </button>
                )}
              </div>
            );
          })
        : null;

    const avatarImagesWoodenBg =
      avatarsImages.length > 0
        ? avatarsImages.map((img, index) => {
            return (
              <div
                key={index}
                className={
                  avatarsImages.length > 7
                    ? "avatarImg-btn-container-woodenBg__severalAvatars"
                    : "avatarImg-btn-container-woodenBg"
                }
              >
                <img
                  className={
                    avatarsImages.length > 7
                      ? "avatar-image-woodenBg-smaller"
                      : "avatar-image-woodenBg"
                  }
                  src={img}
                  alt="avatar"
                />
              </div>
            );
          })
        : null;

    if (!this.props.faceMaskWasChosen) {
      return (
        <div className="face-mask-container">
          <img
            className="wood-sign-face-mask"
            src={this.props.img}
            alt="face mask"
          />
          <img
            className="wood-sign-face-mask__keys"
            src="./images/smith-family-drawing.png"
            alt="face mask"
          />
        </div>
      );
    } else {
      return (
        <div id="product-screen-container-facemask">
          {this.state.familyNameConfirmed.length > 0 ? (
            <div className="virtual-wood-sign-container">
              <h3 className="virtual-wood-sign-container__heading">
                {this.state.familyNameConfirmed.charAt(0).toUpperCase() +
                  this.state.familyNameConfirmed.slice(1)}{" "}
                Family
                {""}{" "}
                <button
                  className="edit-familyName-btn"
                  onClick={this.modifyLastName}
                >
                  Edit Last Name
                </button>
              </h3>

              {this.state.lastnameEditMode ? (
                <form>
                  <label className="lastName-label" htmlFor="family-input">
                    Type your Family Name{" "}
                  </label>
                  <input
                    defaultValue={this.state.familyNameConfirmed}
                    className="lastName-input"
                    name="familyInput"
                    onChange={this.changeHandler}
                    id="family-input"
                    type="text"
                  />
                  <button
                    className="lastName-submit-btn"
                    onClick={this.submitFamilyName}
                  >
                    Click to submit changes
                  </button>
                  <p className="error-msg-wood-sign">{this.state.errorMsg}</p>
                </form>
              ) : null}
              <hr />

              <div className="avatarImgList-wrapper">{avatarImgList}</div>
              <div className="namesList-wrapper">
                {nameForFaceMask.length > 0 ? (
                  <p className="text-center nameHooks-title">
                    These names will be on top of each hook. One hook per
                    person.
                  </p>
                ) : null}
                {namesList}
              </div>
            </div>
          ) : null}

          {this.state.wallHolder === "" ? (
            <div>
              <h1 className="wooden-sign-primary-heading">Choose one below</h1>
              <hr />
              <div className="wood-sign-images-container">
                <div
                  onClick={this.faceMaskHandler}
                  className="wood-sign-img-parent wood-sign-img-parent__face-mask"
                >
                  <h1 className="wooden-sign-secondary-heading">
                    Wooden Face Mask Wall Holder
                  </h1>
                  <img
                    className="wood-sign-images"
                    src="./images/wood-sign-face-mask.png"
                    alt="face mask holder"
                  />
                </div>

                <div
                  onClick={this.keyHolderHandler}
                  className="wood-sign-img-parent wood-sign-img-parent__keys"
                >
                  <h1 className="wooden-sign-secondary-heading">
                    Wooden Key Holder
                  </h1>
                  <img
                    className="wood-sign-images"
                    src="./images/smith-family-drawing.png"
                    alt="face mask holder"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {this.state.isFamilyName ? (
                <div>
                  {!this.state.showPreviewScreen ? (
                    <div>
                      <label
                        className="avatarNumber-label"
                        htmlFor="family-input"
                      >
                        Type Avatar Number{" "}
                        <i className="fas fa-arrow-alt-circle-right"></i>
                      </label>
                      <input
                        className="inputNumber"
                        value={this.state.avatar}
                        name="avatar"
                        onChange={this.changeHandler}
                        id="avatar-input"
                        type="text"
                      />
                      <button
                        className="addAvatar-btn"
                        onClick={
                          this.state.wallHolder === "keyHolder"
                            ? this.addAvatarHandler
                            : this.addAvatarHandlerFaceMask
                        }
                      >
                        <i className="fas fa-user-plus"></i> Add Avatar
                      </button>
                      {this.state.wallHolder === "faceMask" ? (
                        <form>
                          <label className="avatarNumber-label">
                            Add Names{" "}
                            <i className="fas fa-arrow-alt-circle-right"></i>
                          </label>
                          <input
                            className="inputName"
                            value={this.state.nameForFaceMask}
                            name="nameForFaceMask"
                            onChange={this.changeHandler}
                            type="text"
                          />
                          <button
                            className="addAvatar-btn"
                            onClick={this.addNameHandler}
                          >
                            Add Name for Hooks
                          </button>
                        </form>
                      ) : null}
                      <p className="error-msg-wood-sign">
                        {this.state.errorMsg}
                      </p>

                      <hr />

                      <button
                        onClick={this.showPreviewScreenHandler}
                        className="done-btn-wood-sign"
                      >
                        <i className="fas fa-user-check"></i> Click here when
                        you're done
                      </button>
                    </div>
                  ) : (
                    <button
                      className="reset-progress-btn"
                      onClick={this.showPreviewScreenHandler}
                    >
                      Back to edit avatars
                    </button>
                  )}

                  {this.state.wallHolder === "faceMask" ? (
                    <div>
                      {!this.state.showPreviewScreen ? (
                        <div>
                          <h1 className="choose-avatars-title">
                            <i className="fas fa-arrow-down"></i> Choose your
                            avatars <i className="fas fa-arrow-down"></i>
                          </h1>
                          <img
                            className="avatars-poster"
                            src="./images/wood-sign-face-masks-avatars.png"
                            alt="avatars"
                          />{" "}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      {!this.state.showPreviewScreen ? (
                        <div>
                          <h1 className="choose-avatars-title">
                            <i className="fas fa-arrow-down"></i> Choose your
                            avatars and type the avatar-number above{" "}
                            <i className="fas fa-arrow-down"></i>
                          </h1>{" "}
                          <img
                            className="avatars-poster"
                            src="./images/wood-sign-keys-avatars.png"
                            alt="avatars"
                          />{" "}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              ) : (
                <form>
                  <label className="lastName-label" htmlFor="family-input">
                    Type your Family Name{" "}
                  </label>{" "}
                  <input
                    className="lastName-input"
                    name="familyInput"
                    onChange={this.changeHandler}
                    id="family-input"
                    type="text"
                  />
                  <button
                    className="lastName-submit-btn"
                    onClick={this.submitFamilyName}
                  >
                    Click to start
                  </button>
                  <p className="error-msg-wood-sign">{this.state.errorMsg}</p>
                </form>
              )}
            </div>
          )}

          {/* Screen Confirming creation of product */}

          {this.state.showPreviewScreen ? (
            <div className="model-content-container">
              <p className="noteAvatarsTitle text-center">
                Note: Avatars{" "}
                {this.state.wallHolder === "faceMask" ? (
                  <span>and Names</span>
                ) : null}{" "}
                will be nicely distributed accordingly to the chosen model when
                we make the product, so do not worry if this preview is not in
                the middle of the image as it is not an Exact representation of
                the final product.
              </p>

              <div className="model-img-container">
                <h5
                  className={
                    this.state.model1 || this.state.model2 || this.state.model3
                      ? "models-title-no-flashing"
                      : "models-title text-center"
                  }
                >
                  &#8595; Select your model &#8595;
                </h5>

                <div
                  className={
                    this.state.model1
                      ? "model-img-parent--1"
                      : "model-img-parent"
                  }
                >
                  {this.state.wallHolder === "keyHolder" ? (
                    <img
                      className="model-img"
                      src="./images/wood-family-model1.png"
                      alt="model1"
                    />
                  ) : (
                    <img
                      className="model-img"
                      src="./images/wood-family-faceMask-model1.png"
                      alt="model1"
                    />
                  )}

                  <Link
                    activeClass="active"
                    to="product-preview"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <p
                      onClick={this.model1ActiveHandler}
                      className="text-center select-model"
                    >
                      {" "}
                      Select Model 1
                    </p>
                  </Link>
                </div>
                <div
                  className={
                    this.state.model2
                      ? "model-img-parent--2"
                      : "model-img-parent"
                  }
                >
                  {this.state.wallHolder === "keyHolder" ? (
                    <img
                      className="model-img"
                      src="./images/wood-family-model2.png"
                      alt="model1"
                    />
                  ) : (
                    <img
                      className="model-img"
                      src="./images/wood-family-faceMask-model2.png"
                      alt="model1"
                    />
                  )}

                  <Link
                    activeClass="active"
                    to="product-preview"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <p
                      onClick={this.model2ActiveHandler}
                      className="text-center select-model"
                    >
                      Select Model 2
                    </p>
                  </Link>
                </div>
                <div
                  className={
                    this.state.model3
                      ? "model-img-parent--3"
                      : "model-img-parent"
                  }
                >
                  {this.state.wallHolder === "keyHolder" ? (
                    <img
                      className="model-img"
                      src="./images/wood-family-model3.png"
                      alt="model1"
                    />
                  ) : (
                    <img
                      className="model-img"
                      src="./images/wood-family-faceMask-model3.png"
                      alt="model1"
                    />
                  )}

                  <Link
                    activeClass="active"
                    to="product-preview"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <p
                      onClick={this.model3ActiveHandler}
                      className="text-center select-model"
                    >
                      Select Model 3
                    </p>
                  </Link>
                </div>
              </div>
              {this.state.model1 || this.state.model2 || this.state.model3 ? (
                <div>
                  <button
                    className="finish-add-product-to-cart-btn"
                    onClick={this.submitFinalProduct}
                  >
                    <i className="fas fa-cart-plus"></i> Finish and Add product
                    to Cart
                  </button>
                  <h2 className="text-center">
                    &#8595; Product Preview &#8595; <br />
                  </h2>

                  <div className="wood-bg-img-container">
                    <div
                      className={
                        this.state.wallHolder === "faceMask"
                          ? "wood-bg-img-container-faceMask"
                          : "wood-bg-img-container-keyHolder"
                      }
                    >
                      <h1
                        className={
                          familyNameConfirmed.length >= 17
                            ? "wooden-bg-family-name__longest"
                            : familyNameConfirmed.length >= 14
                            ? "wooden-bg-family-name__longer"
                            : familyNameConfirmed.length >= 10
                            ? "wooden-bg-family-name__long"
                            : "wooden-bg-family-name__short"
                        }
                      >
                        {familyNameConfirmed + " Family"}
                        {this.state.wallHolder === "faceMask" ? (
                          <span className="text-center year-on-bg">2020</span>
                        ) : null}
                      </h1>

                      <div className="avatar-img-list-container">
                        {avatarImagesWoodenBg}
                      </div>
                      {this.state.wallHolder === "faceMask" ? (
                        <div className="namesList-on-bg-wrapper">
                          {namesListForBg}
                        </div>
                      ) : null}
                    </div>

                    <button
                      className="finish-add-product-to-cart-btn"
                      onClick={this.submitFinalProduct}
                    >
                      <i className="fas fa-cart-plus"></i> Finish and Add
                      product to Cart
                    </button>
                  </div>
                </div>
              ) : (
                <h4 className="text-center choose-model-title">
                  &#8593; Select your model &#8593;
                </h4>
              )}
            </div>
          ) : null}
          <div id="product-preview"></div>
        </div>
      );
    }
  }
}

export default index;
