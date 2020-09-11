import React, { Component } from "react";
import Carousel from "../../components/Carousel";
import "./style.scss";
import ShoppingCart from "../../components/ShoppingCart";
import { connect } from "react-redux";
import { getCart } from "../../actions/cartActions";

class index extends Component {
  async componentDidMount() {
    await this.props.getCart();
  }

  render() {
    return (
      <div className="home-container">
        {this.props.cart.length > 0 ? (
          <div className="shoppingCart-container">
            <ShoppingCart onRef={(ref) => (this.shoppingCartComponent = ref)} />
          </div>
        ) : null}
        <h1 className="home__heading text-center">Memories that matter...</h1>
        <div className="image-home-parent text-center">
          <Carousel className="carousel-parent" />

          <div className="information-parent">
            <h1 className="home-secondary-heading text-center">
              The perfect gift for every occasion
            </h1>
            <hr className="hr-home" />
            <ul className="items-list-home-parent">
              <a className="link-to-products" href="/products">
                <li className="items-list-home items-list-home__shirt">
                  Shirts
                </li>
                <li className="items-list-home items-list-home__mug">Mugs</li>
                <li className="items-list-home items-list-home__pillow">
                  Pillows
                </li>
                <li className="items-list-home items-list-home__pet-tag">
                  Pet tags
                </li>
                <li className="items-list-home items-list-home__uniform-logos">
                  Uniform logos
                </li>
                <li className="items-list-home items-list-home__hat">Hats</li>
                <li className="items-list-home items-list-home__plate">
                  Pencil case
                </li>
                <li className="items-list-home items-list-home__plate">
                  And much more!
                </li>
              </a>
            </ul>
            <div className="home-shipped-to-door-wrapper">
              <h3 className="home-shipped-title">
                Shipped to your door (within Ontario){" "}
                <span role="img" aria-label="house">
                  &#127968;
                </span>
              </h3>
              <span role="img" aria-label="truck" className="home-truck">
                &#128666;
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href="/products">
            <button className="home-button">
              Create my customized Product...
            </button>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps, {
  getCart,
})(index);
