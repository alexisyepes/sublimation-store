import React, { Component } from "react";
import "./style.scss";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hamburger: false,
      articlesInCart: false,
      cart: this.props.cart,
    };
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        articlesInCart: true,
        cart: this.props.cart,
      });
    }
  }

  toggleHamburger = async () => {
    await this.setState({
      hamburger: !this.state.hamburger,
    });
  };

  checkCartHome = () => {
    if (
      this.state.cart > 0 &&
      window.confirm(
        "There are products in the shopping cart; if you leave, all your progress will be lost and the cart will be empty. \nAre you sure you wish to leave?"
      )
    ) {
      return (window.location.href = "/");
    } else {
      return false;
    }
  };

  checkCartContact = () => {
    if (
      this.state.cart > 0 &&
      window.confirm(
        "There are products in the shopping cart; if you leave, all your progress will be lost and the cart will be empty. \nAre you sure you wish to leave?"
      )
    ) {
      return (window.location.href = "/contact");
    } else {
      return false;
    }
  };

  checkCartAbout = () => {
    if (
      this.state.cart > 0 &&
      window.confirm(
        "There are products in the shopping cart; if you leave, all your progress will be lost and the cart will be empty. \nAre you sure you wish to leave?"
      )
    ) {
      return (window.location.href = "/about");
    } else {
      return false;
    }
  };

  checkCartProducts = async () => {
    if (
      this.state.cart > 0 &&
      window.confirm(
        "There are products in the shopping cart; if you leave or refresh this page, or continue, all your progress will be lost and the cart will be empty. \nAre you sure you wish to continue?"
      )
    ) {
      return (window.location.href = "/products");
    }
  };

  checkCartGeneralProducts = async () => {
    if (
      this.state.cart > 0 &&
      window.confirm(
        "There are products in the shopping cart; if you leave or refresh this page, or continue, all your progress will be lost and the cart will be empty. \nAre you sure you wish to continue?"
      )
    ) {
      return (window.location.href = "/general_products");
    }
  };

  render() {
    return (
      <nav className="nav-bar-container">
        <div className="logo">
          <a href="/">
            <img
              className="logo logo__navbar"
              src="./images/logo.png"
              alt="logo sub"
            />
          </a>
        </div>
        <ul className="menu">
          <div className="hamburger">
            <i onClick={this.toggleHamburger} className="fas fa-bars"></i>
          </div>

          {/* Navbar */}

          <li className="nav-link nav-link__home">
            <a className="links-home" href="/">
              <i className="fas fa-home"></i>
            </a>
          </li>

          <li className="nav-link nav-link__about">
            <a className="links-home" href="/about">
              About
            </a>
          </li>

          <li className="nav-link nav-link__about">
            <a className="links-home" href="/gallery">
              Gallery
            </a>
          </li>

          <li className="nav-link nav-link__products">
            <a
              onClick={this.checkCartProducts}
              className="links-home"
              href="/products"
            >
              Custom Products
            </a>
          </li>

          <li className="nav-link nav-link__general">
            <a className="links-home" href="/general_products">
              Cool Products
            </a>
          </li>

          <li className="nav-link nav-link__contact">
            <a
              onClick={this.checkCartContact}
              className="links-home"
              href="/contact"
            >
              Contact
            </a>
          </li>
        </ul>
        {/* Sidebar */}
        {this.state.hamburger ? (
          <nav className="sidebar">
            <li className="nav-link-sidebar nav-link__home">
              <a className="links-home" href="/">
                Home
              </a>
            </li>
            <li className="nav-link-sidebar nav-link__about">
              <a className="links-home" href="/about">
                About
              </a>
            </li>
            <li className="nav-link-sidebar nav-link__about">
              <a className="links-home" href="/gallery">
                Gallery
              </a>
            </li>
            <li className="nav-link-sidebar nav-link__products">
              <a className="links-home" href="/products">
                Custom Products
              </a>
            </li>
            <li className="nav-link-sidebar nav-link__cool_products">
              <a className="links-home" href="/general_products">
                Cool Products
              </a>
            </li>
            <li className="nav-link-sidebar nav-link__contact">
              <a className="links-home" href="/contact">
                Contact
              </a>
            </li>
          </nav>
        ) : null}
      </nav>
    );
  }
}
