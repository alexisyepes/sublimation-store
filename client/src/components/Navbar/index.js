import React, { Component } from "react";
import "./style.scss";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hamburger: false,
    };
  }

  toggleHamburger = async () => {
    await this.setState({
      hamburger: !this.state.hamburger,
    });
    console.log(this.state.hamburger);
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
              Home
            </a>
          </li>
          <li className="nav-link nav-link__about">
            <a className="links-home" href="/about">
              About
            </a>
          </li>
          <li className="nav-link nav-link__products">
            <a className="links-home" href="/products">
              Create my product
            </a>
          </li>
          <li className="nav-link nav-link__contact">
            <a className="links-home" href="/contact">
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
            <li className="nav-link-sidebar nav-link__products">
              <a className="links-home" href="/products">
                Create my product
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
