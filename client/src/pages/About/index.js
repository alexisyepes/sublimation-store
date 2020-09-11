import React, { Component } from "react";
import Card from "../../components/Card";
import "./style.scss";
import ShoppingCart from "../../components/ShoppingCart";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img1: "./images/about/family2.jpg",
      img2: "./images/about/family.jpg",
      img3: "./images/about/family3.jpg",
      img4: "./images/about/children.jpg",
      img5: "./images/about/people.jpg",
      img6: "./images/about/children.jpg",
      img7: "./images/about/mom-daughter.jpg",
    };
  }
  render() {
    return (
      <div className="about-container">
        <div className="shoppingCart-container">
          <ShoppingCart onRef={(ref) => (this.shoppingCartComponent = ref)} />
        </div>
        <h1 className="primary-heading-about text-center">About us </h1>
        <div className="images-about__1">
          <Card img={this.state.img2} />
        </div>
        <p className="paragraph-about">
          We are 100% committed to deliver a quality-product to fulfill your
          expectations <br />
          Give mom or dad a gift they'll never forget. <br /> With us, you'll be
          able to customize your products by using your own photos or designs,
          and you'll have the option to get it delivered to your door, or to
          pick it up from 2 locations (Milton or Cambridge). <br />
          <a href="/products">
            <button className="home-button home-button_about">
              Create a Product
            </button>
          </a>{" "}
        </p>
        <div className="images-about__5">
          <Card img={this.state.img1} />
        </div>
        <div className="images-about__7">
          <Card img={this.state.img7} />
        </div>
        <div className="images-about__2">
          <Card img={this.state.img3} />
        </div>
        <div className=" images-about__4">
          <Card img={this.state.img5} />
        </div>
        <div className="images-about__6">
          <Card img={this.state.img6} />
        </div>
      </div>
    );
  }
}
