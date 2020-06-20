import React, { Component } from "react";
import Card from "../../components/Card";
import "./style.scss";

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
        <h1 className="primary-heading-about text-center">About us </h1>
        <Card className="images-about images-about__1" img={this.state.img2} />
        <p className="paragraph-about">
          We are 100% committed to deliver a quality-product to fulfill your
          expectations <br />
          Give mom or dad a gift they'll never forget. <br /> With us, you'll be
          able to customize your products by using your own photos or designs,
          and you'll have the option to get it delivered to your door, or to
          pick it up from 2 locations (Milton or Cambridge). <br />
          <a href="/products">
            <button className="home-button">Create a Product</button>
          </a>{" "}
        </p>
        <Card className="images-about images-about__5" img={this.state.img1} />
        <Card className="images-about images-about__7" img={this.state.img7} />
        <Card className="images-about images-about__2" img={this.state.img3} />
        <Card className="images-about images-about__4" img={this.state.img5} />
        <Card className="images-about images-about__6" img={this.state.img6} />
      </div>
    );
  }
}
