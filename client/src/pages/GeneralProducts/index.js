import React, { Component } from "react";
import axios from "axios";
import "./style.scss";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { getCart, addItemToCart } from "../../actions/cartActions";
import ShoppingCart from "../../components/ShoppingCart";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      productBeingAdded: "",
    };
  }

  async componentDidMount() {
    await this.props.getProducts();
    await this.props.getCart();
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      textFormatOptions: true,
    });
  };

  increaseQty = () => {
    this.setState({
      qty: this.state.qty + 1,
    });
  };

  decreaseQty = () => {
    if (this.state.qty === 1) {
      return;
    }
    this.setState({
      qty: this.state.qty - 1,
    });
  };

  showQtyContainer = ({ currentTarget }) => {
    this.setState({
      productBeingAdded: currentTarget.value,
    });
  };

  addProductToCart = async ({ currentTarget }) => {
    let _id = currentTarget.value;
    await this.props.getCart();
    const checkCartIfProductExists = this.props.cart.filter(
      (item) => item._id === _id
    );
    if (checkCartIfProductExists.length > 0) {
      return alert(
        "This item is already in the cart. \nClick on the cart icon to update it."
      );
    }

    await axios
      .get("/product/" + _id)
      .then((res) => {
        let productToAddToCart = {
          _id: res.data._id,
          productName: res.data.productName,
          productImage: res.data.images[0],
          price: res.data.price,
          qty: this.state.qty,
          subTotal: res.data.price * this.state.qty,
          images: res.data.images[0],
          screenShots: res.data.images[0],
        };
        this.props.addItemToCart(productToAddToCart);
      })
      .catch((err) => console.log(err));
    this.setState({
      qty: 1,
      productBeingAdded: "",
    });
    this.props.getCart();
  };

  render() {
    return (
      <div className="main-container-generalProducts">
        <div className="shoppingCart-container">
          <ShoppingCart onRef={(ref) => (this.shoppingCartComponent = ref)} />
        </div>
        <h1 className="text-center more-products__heading">Special products</h1>
        <div className="products-general-wrapper">
          {this.props.products.products.data ? (
            this.props.products.products.data.map((product) => {
              return (
                <div
                  key={product._id}
                  className="product-general-products-container"
                >
                  <h2 className="text-center item-heading">
                    {product.productName}{" "}
                  </h2>

                  <div className="item-img-container">
                    <img
                      className="item-img"
                      src={product.images[0]}
                      alt="item"
                    />
                  </div>
                  <div className="item-img-container__product1">
                    {/* <i className="zoomIcon fas fa-search-plus"></i> */}
                    <img
                      className="item-img__product1"
                      src={product.images[1]}
                      alt="item"
                    />
                    {/* <p className="text-center article-not-included">
                      Purse not included
                    </p> */}
                  </div>
                  <div className="item-img-container__product2">
                    {/* <i className="zoomIcon fas fa-search-plus"></i> */}
                    <img
                      className="item-img__product2"
                      src={product.images[2]}
                      alt="item"
                    />{" "}
                    {/* <p className="text-center article-not-included">
                      Backpack not included
                    </p> */}
                  </div>
                  <div className="product-general-info-container">
                    <h4 className="text-center productGeneral-info-heading">
                      Product Info
                    </h4>
                    <p className="product-info-paragraph">
                      <strong>Description:</strong> {product.description}
                    </p>
                    <p className="product-info-paragraph">
                      <strong>Size / Dimensions:</strong> {product.size}
                    </p>
                    <p className="product-info-paragraph">
                      <strong>Price:</strong> ${product.price / 100}
                    </p>
                    {this.state.productBeingAdded === product.productName ? (
                      <div className="qty-container__general-products">
                        <h4 className="h2-qty">
                          QTY:
                          <div className="qty-symbols qty-symbols__number">
                            {this.state.qty}
                          </div>
                          <button
                            onClick={this.increaseQty}
                            className="qty-symbols qty-symbols__plus"
                          >
                            +
                          </button>
                          <button
                            onClick={this.decreaseQty}
                            className="qty-symbols qty-symbols__minus"
                          >
                            -
                          </button>{" "}
                        </h4>
                        <button
                          value={product._id}
                          onClick={this.addProductToCart}
                          className="adToCart-btn"
                        >
                          Add to Cart <i className="fas fa-cart-plus"></i>
                        </button>{" "}
                      </div>
                    ) : (
                      <button
                        className="selectItem-btn"
                        value={product.productName}
                        onClick={this.showQtyContainer}
                      >
                        Select this Item
                      </button>
                    )}
                  </div>

                  <div className="promo-video">
                    <video className="promo-video__content" autoPlay muted loop>
                      <source src={product.images[3]} type="video/mp4" />
                      <source src={product.images[3]} type="video/webm" />
                      Your browser is not supported!
                    </video>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading Products...</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, {
  getProducts,
  getCart,
  addItemToCart,
})(index);
