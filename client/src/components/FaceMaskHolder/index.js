import React, { Component } from "react";
import Modal from "react-modal";
import "./style.scss";

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
      modalToConfirm: false,
      lastnameEditMode: false,
    };
  }

  toggleModalToConfirmOrder = () => {
    this.setState({
      modalToConfirm: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalToConfirm: false,
    });
  };

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
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar1_vjiews.png";
    } else if (this.state.avatar === "2") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950352/avatars/avatar2_dkyz9e.png";
    } else if (this.state.avatar === "3") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950352/avatars/avatar3_yxcowi.png";
    } else if (this.state.avatar === "4") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950352/avatars/avatar4_laionz.png";
    } else if (this.state.avatar === "5") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950352/avatars/avatar5_ljsrlz.png";
    } else if (this.state.avatar === "6") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950352/avatars/avatar6_ap1a0y.png";
    } else if (this.state.avatar === "7") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950352/avatars/avatar7_zvchbn.png";
    } else if (this.state.avatar === "8") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar8_gb2sg1.png";
    } else if (this.state.avatar === "9") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar9_m6bk7e.png";
    } else if (this.state.avatar === "10") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar10_m56sy2.png";
    } else if (this.state.avatar === "11") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar11_lg2uaf.png";
    } else if (this.state.avatar === "12") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar12_snei9z.png";
    } else if (this.state.avatar === "13") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar13_u8kudm.png";
    } else if (this.state.avatar === "14") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar14_cvnizg.png";
    } else if (this.state.avatar === "15") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar15_e8gonk.png";
    } else if (this.state.avatar === "16") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar16_dbxcme.png";
    } else if (this.state.avatar === "17") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950353/avatars/avatar17_evosqm.png";
    } else if (this.state.avatar === "18") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar18_wbjsvp.png";
    } else if (this.state.avatar === "19") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar19_qnpwxn.png";
    } else if (this.state.avatar === "20") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar20_eh7phx.png";
    } else if (this.state.avatar === "21") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar21_mihksq.png";
    } else if (this.state.avatar === "22") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar22_og3orv.png";
    } else if (this.state.avatar === "23") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar23_n0gldg.png";
    } else if (this.state.avatar === "24") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar24_c37vvw.png";
    } else if (this.state.avatar === "25") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar25_wli2om.png";
    } else if (this.state.avatar === "26") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar26_jfzp68.png";
    } else if (this.state.avatar === "27") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950354/avatars/avatar27_clh23o.png";
    } else if (this.state.avatar === "28") {
      chosenImg =
        "https://res.cloudinary.com/ayp-sublimation/image/upload/v1597950355/avatars/avatar28_lg2izo.png";
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
    });
  };

  modifyLastName = () => {
    this.setState({
      lastnameEditMode: true,
    });
  };

  render() {
    let familyNameConfirmed = this.state.familyNameConfirmed;
    const avatarsImages = this.state.avatarImages;
    const avatarImgList =
      avatarsImages.length > 0
        ? avatarsImages.map((img, index) => {
            return (
              <div key={index} className="avatarImg-btn-container">
                <img className="avatar-image" src={img} alt="avatar" />
                <button
                  onClick={this.removeAvatar}
                  value={img}
                  className="removeAvatar"
                >
                  x
                </button>
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
        <div>
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
                  <label htmlFor="family-input">Type your Family Name </label>
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
            </div>
          ) : null}
          {this.state.wallHolder === "" ? (
            <div>
              <h1>Choose one below</h1>
              <hr />
              <div className="wood-sign-images-container">
                <div
                  onClick={this.faceMaskHandler}
                  className="wood-sign-img-parent wood-sign-img-parent__face-mask"
                >
                  <h1>Wooden Face Mask Wall Holder</h1>
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
                  <h1>Wooden Key Holder</h1>
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
                      onClick={this.addAvatarHandler}
                    >
                      <i className="fas fa-user-plus"></i> Add Avatar
                    </button>
                    <p className="error-msg-wood-sign">{this.state.errorMsg}</p>

                    <button
                      onClick={this.toggleModalToConfirmOrder}
                      className="done-btn-wood-sign"
                    >
                      <i className="fas fa-user-check"></i> Click here if you're
                      done
                    </button>
                  </div>
                  {this.state.wallHolder === "faceMask" ? (
                    <div>
                      <h1>
                        <i className="fas fa-arrow-down"></i> Choose your
                        avatars <i className="fas fa-arrow-down"></i>
                      </h1>
                      <img
                        className="avatars-poster"
                        src="./images/wood-sign-face-masks-avatars.png"
                        alt="avatars"
                      />{" "}
                    </div>
                  ) : (
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
                  )}
                </div>
              ) : (
                <form>
                  <label htmlFor="family-input">Type your Family Name </label>
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

          {/* Modal Confirming creation of product */}
          <Modal
            appElement={document.getElementById("root")}
            isOpen={this.state.modalToConfirm}
            onRequestClose={this.closeModal}
            className="Modal-wood-sign"
            overlayClassName="Overlay-wood-sign"
          >
            <span className="x-close-modal-step3" onClick={this.closeModal}>
              X
            </span>
            <h2 className="text-center">
              This is your product Preview <br />
            </h2>
            <p className="noteAvatarsTitle text-center">
              Note: Avatars will be centered together as a group and nicely
              distributed, <br /> so do not worry if this preview is not in the
              middle of the image, as it is not an Exact representation of the
              final product.
            </p>

            <div className="wood-bg-img-container">
              <h1
                className={
                  familyNameConfirmed.length >= 17
                    ? "wooden-bg-family-name__long_long"
                    : familyNameConfirmed.length >= 14
                    ? "wooden-bg-family-name__longest"
                    : familyNameConfirmed.length >= 10
                    ? "wooden-bg-family-name__long"
                    : "wooden-bg-family-name__short"
                }
              >
                {familyNameConfirmed + " Family"}
              </h1>
              <div className="avatar-img-list-container">
                {avatarImagesWoodenBg}
              </div>
              {/* <div className="avatar-img-list-container">{avatarImgList}</div> */}
              <img
                className="wood-bg-img"
                src="./images/wood-bg.png"
                alt="wood-bg"
              />
            </div>
          </Modal>
        </div>
      );
    }
  }
}

export default index;
