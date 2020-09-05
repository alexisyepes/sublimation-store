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
          {this.state.cart > 0 ? (
            <img
              onClick={this.checkCartHome}
              className="logo logo__navbar"
              src="./images/logo.png"
              alt="logo sub"
            />
          ) : (
            <a href="/">
              <img
                className="logo logo__navbar"
                src="./images/logo.png"
                alt="logo sub"
              />
            </a>
          )}
        </div>
        <ul className="menu">
          <div className="hamburger">
            <i onClick={this.toggleHamburger} className="fas fa-bars"></i>
          </div>

          {/* Navbar */}

          <li className="nav-link nav-link__home">
            {this.state.cart > 0 ? (
              <div onClick={this.checkCartHome} className="links-home" href="/">
                <i className="fas fa-home"></i>
              </div>
            ) : (
              <a className="links-home" href="/">
                <i className="fas fa-home"></i>
              </a>
            )}
          </li>

          <li className="nav-link nav-link__about">
            {this.state.cart > 0 ? (
              <div
                onClick={this.checkCartAbout}
                className="links-home"
                href="/about"
              >
                About
              </div>
            ) : (
              <a className="links-home" href="/about">
                About
              </a>
            )}
          </li>

          <li className="nav-link nav-link__about">
            {this.state.cart > 0 ? (
              <div
                onClick={this.checkCartAbout}
                className="links-home"
                href="/gallery"
              >
                Gallery
              </div>
            ) : (
              <a className="links-home" href="/gallery">
                Gallery
              </a>
            )}
          </li>

          <li className="nav-link nav-link__products">
            {this.state.cart > 0 ? (
              <div
                onClick={this.checkCartProducts}
                className="links-home"
                href="/products"
              >
                Create product
              </div>
            ) : (
              <a
                onClick={this.checkCartProducts}
                className="links-home"
                href="/products"
              >
                Create product
              </a>
            )}
          </li>

          <li className="nav-link nav-link__general">
            {this.state.cart > 0 ? (
              <div
                onClick={this.checkCartGeneralProducts}
                className="links-home"
                href="/general_products"
              >
                More...
              </div>
            ) : (
              <a className="links-home" href="/general_products">
                More...
              </a>
            )}
          </li>

          <li className="nav-link nav-link__contact">
            {this.state.cart > 0 ? (
              <div
                onClick={this.checkCartContact}
                className="links-home"
                href="/contact"
              >
                Contact
              </div>
            ) : (
              <a
                onClick={this.checkCartContact}
                className="links-home"
                href="/contact"
              >
                Contact
              </a>
            )}
          </li>
        </ul>
        {/* Sidebar */}
        {this.state.hamburger ? (
          <nav className="sidebar">
            <li className="nav-link-sidebar nav-link__home">
              {this.state.cart > 0 ? (
                <div
                  onClick={this.checkCartHome}
                  className="links-home"
                  href="/"
                >
                  Home
                </div>
              ) : (
                <a className="links-home" href="/">
                  Home
                </a>
              )}
            </li>
            <li className="nav-link-sidebar nav-link__about">
              {this.state.cart > 0 ? (
                <div
                  onClick={this.checkCartAbout}
                  className="links-home"
                  href="/about"
                >
                  About
                </div>
              ) : (
                <a className="links-home" href="/about">
                  About
                </a>
              )}
            </li>
            <li className="nav-link-sidebar nav-link__about">
              {this.state.cart > 0 ? (
                <div
                  onClick={this.checkCartAbout}
                  className="links-home"
                  href="/gallery"
                >
                  Gallery
                </div>
              ) : (
                <a className="links-home" href="/gallery">
                  Gallery
                </a>
              )}
            </li>
            <li className="nav-link-sidebar nav-link__products">
              {this.state.cart > 0 ? (
                <div
                  onClick={this.checkCartProducts}
                  className="links-home"
                  href="/products"
                >
                  Create my product
                </div>
              ) : (
                <a className="links-home" href="/products">
                  Create my product
                </a>
              )}
            </li>
            <li className="nav-link-sidebar nav-link__products">
              {this.state.cart > 0 ? (
                <div
                  onClick={this.checkCartGeneralProducts}
                  className="links-home"
                  href="/general_products"
                >
                  More...
                </div>
              ) : (
                <a className="links-home" href="/general_products">
                  More...
                </a>
              )}
            </li>
            <li className="nav-link-sidebar nav-link__contact">
              {this.state.cart > 0 ? (
                <div
                  onClick={this.checkCartContact}
                  className="links-home"
                  href="/contact"
                >
                  Contact
                </div>
              ) : (
                <a className="links-home" href="/contact">
                  Contact
                </a>
              )}
            </li>
          </nav>
        ) : null}
      </nav>
    );
  }
}
