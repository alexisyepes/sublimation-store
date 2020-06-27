import React, { Fragment, Component } from "react";
import Modal from "react-modal";
import "./style.scss";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalFont: false,
    };
  }

  toggleModalFont = () => {
    this.setState({
      modalFont: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalFont: false,
    });
  };

  render() {
    return (
      <Fragment>
        <span className="font-selector" onClick={this.toggleModalFont}>
          Font
        </span>
        <Modal
          appElement={document.getElementById("root")}
          className="ModalFonts"
          overlayClassName="OverlayFonts"
          isOpen={this.state.modalFont}
          onRequestClose={this.closeModal}
        >
          <span className="x-close-modal" onClick={this.closeModal}>
            X
          </span>
          <h2 className=" text-center">Choose your font </h2>
          <hr />
          <div className="font-group-wrapper">
            <h2
              onClick={this.props.font1}
              className="font-type font-type__1 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font2}
              className="font-type font-type__2 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font3}
              className="font-type font-type__3 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font4}
              className="font-type font-type__4 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font5}
              className="font-type font-type__5 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font6}
              className="font-type font-type__6 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font7}
              className="font-type font-type__7 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font8}
              className="font-type font-type__8 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font9}
              className="font-type font-type__9 text-center"
            >
              Life is beautiful
            </h2>
            <h2
              onClick={this.props.font10}
              className="font-type font-type__10 text-center"
            >
              Life is beautiful
            </h2>
          </div>
          <button className=" confirm-font-btn" onClick={this.closeModal}>
            Confirm
          </button>
        </Modal>
      </Fragment>
    );
  }
}

export default index;
