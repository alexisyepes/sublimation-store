import React, { Component } from "react";
import axios from "axios";
import LoadPage from "../../components/LoadPage";
import "./style.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      loadingAxiosReq: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    // e.target.reset();

    let textToSend = {
      email: this.state.email,
      message: this.state.message,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .post("/contact", textToSend)
      .then(() => {
        this.setState({
          loadingAxiosReq: false,
        });
        // alert(
        //   "Thanks for contacting us! We'll get back to you as soon as we can."
        // );
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loadingAxiosReq: false,
        });
      });
  };

  render() {
    return (
      <div className="contact-container">
        <h1 className="primary-heading-contact text-center">
          Contact us <hr className="hr-home" />
        </h1>
        <div className="contact-form-container">
          <p className="contact-paragraph">
            Have questions? A special request? <br /> Fill out the form and
            we'll get back to you as soon as we can. <br /> Or send us an email
            to:{" "}
            <a className="email" href="mailto:aypsublimation@gmail.com">
              aypsublimation@gmail.com{" "}
            </a>
          </p>
          <form onSubmit={this.handleFormSubmit} className="contact-form">
            <input
              className="contact-form-textArea"
              type="email"
              name="email"
              placeholder="your email"
              onChange={this.handleChange}
            />
            <textarea
              className="contact-form-textArea"
              placeholder="your message"
              type="textarea"
              name="message"
              onChange={this.handleChange}
            />
            {this.state.loadingAxiosReq ? (
              <LoadPage />
            ) : (
              <button className="contact-btn">Send Message</button>
            )}
          </form>
          <img
            className="office-contact"
            src="./images/office.jpg"
            alt="office"
          />
          <img
            className="office-contact"
            src="./images/office2.jpg"
            alt="office"
          />
          <img
            className="office-contact"
            src="./images/office3.jpg"
            alt="office"
          />
        </div>
        <img className="phone-img" src="./images/phone.jpg" alt="phone" />
      </div>
    );
  }
}
