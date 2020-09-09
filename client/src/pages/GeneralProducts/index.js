import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.scss";
import Modal from "react-modal";
import Select from "react-select";
import CheckoutStripe from "../../components/StripeForm";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import {
  getCart,
  increaseQtyInCart,
  decreaseQtyInCart,
  addItemToCart,
  emptyOutCart,
  removeItemFromCart,
  getSubTotalPrice,
} from "../../actions/cartActions";

let shippingOptions = [
  {
    value: "delivery",
    label: "Delivered to you $15.00 (3-4 business days. Ontario only)",
  },
  {
    value: "pickUpCambridge",
    label: "Pickup from Cambridge, ON (FREE)",
  },
  {
    value: "pickUpMilton",
    label: "Pickup from Milton, ON (FREE)",
  },
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalToCheckout: false,
      firstName: "",
      email: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      billingDetails: false,
      checkOutStripe: false,
      showMsgInput: false,
      showQtyToUpdate: false,
      showCheckout: false,
      errorMsg: "",
      errorCoupon: "",
      selectedCouponPrice: 0,
      couponCodeInput: "h873huih8",
      selectedCouponName: "",
      loadingAxiosReq: false,

      qty: 1,
      subTotal: 0,
      tax: 0,
      total: 0,
      //state managed in App.js
      productToPay: [],
      productsInCart: [],
      //state managed in App.js

      //State in Redux Store
      cartInLocalComponent: 0,

      productBeingAdded: "",
    };
  }

  async componentDidMount() {
    this.props.getProducts();
    await this.props.getCart();
    // console.log(this.props);
  }

  closeModalCheckout = async () => {
    await this.setState({
      modalToCheckout: false,
    });
  };

  onSelectedShipping = async (value) => {
    await this.setState({
      shippingMethod: value.value,
      errorMsg: "",
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      textFormatOptions: true,
    });
  };

  onChangeHandlerBillingDetails = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  modalToCheckoutOpen = async () => {
    if (!this.state.modalToCheckout) {
      await this.props.getSubTotalPrice();
      const subTotal =
        this.props.cart.length > 0
          ? this.props.cart.map((item) => item.subTotal).reduce((a, b) => a + b)
          : 0;
      const tax = subTotal * 0.13;

      await this.setState({
        subTotal: subTotal,
        tax: subTotal * 0.13,
        total: subTotal + tax,
        firstName: "",
        email: "",
        billingDetails: false,
        checkOutStripe: false,
        errorMsg: "",
        shippingMethod: "",
        couponCodeInput: "h873huih8",
        selectedCouponPrice: 0,
      });
    }
    this.setState({
      modalToCheckout: true,
    });
  };

  removeItemFromCart = async ({ currentTarget }) => {
    await this.props.removeItemFromCart(currentTarget.value);
    const subTotal =
      this.props.cart.length > 0
        ? this.props.cart.map((item) => item.subTotal).reduce((a, b) => a + b)
        : 0;
    const tax = subTotal * 0.13;

    this.setState({
      subTotal: subTotal,
      tax: subTotal * 0.13,
      total: subTotal + tax,
    });
  };

  increaseQtyInCart = ({ currentTarget }) => {
    this.props.increaseQtyInCart(currentTarget.value);
    const subTotal = this.props.cart
      .map((item) => item.subTotal)
      .reduce((a, b) => a + b);
    const tax = subTotal * 0.13;

    this.setState({
      subTotal: subTotal,
      tax: subTotal * 0.13,
      total: subTotal + tax,
    });
  };

  decreaseQtyInCart = ({ currentTarget }) => {
    const checkQtyFirst = this.props.cart.filter(
      (item) => item._id === currentTarget.value
    );

    if (checkQtyFirst[0].qty === 1) {
      return;
    }
    this.props.decreaseQtyInCart(currentTarget.value);
    // this.props.getCart();
    const subTotal = this.props.cart
      .map((item) => item.subTotal)
      .reduce((a, b) => a + b);
    const tax = subTotal * 0.13;

    this.setState({
      subTotal: subTotal,
      tax: subTotal * 0.13,
      total: subTotal + tax,
    });
  };

  submitBillingDetails = (e) => {
    e.preventDefault();

    if (
      !this.state.firstName ||
      !this.state.email ||
      !this.state.address ||
      !this.state.city ||
      !this.state.province ||
      !this.state.postalCode
    ) {
      return this.setState({
        errorMsg: "All the fields are required!",
      });
    }
    if (!this.state.shippingMethod) {
      return this.setState({
        errorMsg: "Please choose one of the delivery or pickup options above",
      });
    }

    this.setState({
      billingDetails: true,
      checkOutStripe: true,
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

  validateCouponHandler = async (e) => {
    e.preventDefault();
    // if (this.state.productToPay.length === 0) {
    //   return this.setState({
    //     errorMsg: "No Coupons can be used without a product in cart!",
    //   });
    // }
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .get("/all_coupons")
      .then(async (res) => {
        const couponValidated = res.data.filter((word) =>
          word.couponName.includes(this.state.couponCodeInput.trim())
        );
        // console.log(couponValidated[0]);
        if (couponValidated.length !== 0) {
          await this.setState({
            loadingAxiosReq: false,
            selectedCouponName: couponValidated[0].couponName,
            selectedCouponPrice: couponValidated[0].price,
            errorCoupon: "",
          });
        } else {
          await this.setState({
            loadingAxiosReq: false,
            selectedCouponPrice: 0,
            errorCoupon: "Coupon is Invalid",
          });
        }
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  showQtyContainer = ({ currentTarget }) => {
    if (currentTarget.value === "1") {
      this.setState({
        productBeingAdded: "Keychain",
        qty: 1,
      });
    }
    if (currentTarget.value === "2") {
      this.setState({
        productBeingAdded: "Bunny shirt",
        qty: 1,
      });
    }
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
        // console.log(res);
        let productToAddToCart = {
          _id: res.data._id,
          productName: res.data.productName,
          price: res.data.price,
          qty: this.state.qty,
          subTotal: res.data.price * this.state.qty,
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

  // increaseQtyToUpdate = ({ currentTarget }) => {
  //   this.setState({
  //     qty: currentTarget.value + 1,
  //   });
  // };

  trashAllCartItems = () => {
    this.props.emptyOutCart();
    this.setState({
      qty: 1,
      subTotal: null,
    });
  };

  showCheckoutFormHandler = () => {
    if (this.props.cart.length === 0) {
      return;
    }
    this.setState({
      showCheckout: !this.state.showCheckout,
    });
  };

  render() {
    const cartContent = this.props.cart;
    const itemsInCartList =
      cartContent.length > 0 ? (
        cartContent.map((item) => {
          return (
            <div className="itemInCart-wrapper" key={item._id}>
              <p className="cart-info-parag">
                Product Name: {item.productName}
              </p>
              <p className="cart-info-parag">Price: {item.price / 100}</p>
              <div>
                <p className="cart-info-parag">
                  <span>Qty: {item.qty}</span>{" "}
                  <button
                    value={item._id}
                    onClick={this.increaseQtyInCart}
                    className="counter-btns counter-btns__plus"
                  >
                    {" "}
                    <i className="fas fa-plus"></i>
                  </button>{" "}
                  <button
                    value={item._id}
                    onClick={this.decreaseQtyInCart}
                    className="counter-btns counter-btns__minus"
                  >
                    <i className="fas fa-minus"></i>
                  </button>{" "}
                  <button
                    value={item._id}
                    className="remove-item-from-cart-modal-btn"
                    onClick={this.removeItemFromCart}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </p>
              </div>

              <hr />
            </div>
          );
        })
      ) : (
        <p className="text-center">Cart is empty</p>
      );

    return (
      <div>
        <h1 className="text-center more-products__heading">More products</h1>
        {!this.state.modalToCheckout ? (
          <div onClick={this.modalToCheckoutOpen} className="cart-container">
            <span aria-label="0" role="img">
              &#128722;{" "}
              {this.props.cart.length > 0
                ? this.props.cart
                    .map((item) => item.qty)
                    .reduce((a, b) => a + b)
                : 0}
            </span>
          </div>
        ) : null}
        <div className="products-general-wrapper">
          <div className="product-general-products-container">
            <h2 className="text-center keychain-facemask-heading">Keychain </h2>
            <div className="keychain-facemask-img-container">
              <img
                className="keychain-facemask-img"
                src="./images/keychain-facemask.png"
                alt="keychain"
              />
            </div>
            <div className="keychain-facemask-img-container__purse">
              <i className="zoomIcon fas fa-search-plus"></i>
              <img
                className="keychain-facemask-img__purse"
                src="./images/keychain-purse.png"
                alt="keychain"
              />
              <p className="text-center article-not-included">
                Purse not included
              </p>
            </div>
            <div className="keychain-facemask-img-container__backpack">
              <i className="zoomIcon__backpack fas fa-search-plus"></i>
              <img
                className="keychain-facemask-img__backpack"
                src="./images/keychain-backpack.png"
                alt="keychain"
              />{" "}
              <p className="text-center article-not-included">
                Backpack not included
              </p>
            </div>
            <div className="product-general-info-container">
              <h4 className="text-center productGeneral-info-heading">
                Product Info
              </h4>
              <p className="product-info-paragraph">
                <strong>Description:</strong> This keychain will send a clear
                message to people around you or your children, when they're too
                close for comfort. It can be attached to backpacks, or purses.{" "}
                <br /> The image goes on both sides and it is made of Aluminum
                with a shiny finish.
              </p>
              <p className="product-info-paragraph">
                <strong>Measurements:</strong> 0.045"x2.25"x1.6"
              </p>
              <p className="product-info-paragraph">
                <strong>Price:</strong> $7.99
              </p>
              {this.state.productBeingAdded === "Keychain" ? (
                <div className="qty-container">
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
                    value="5f52afd53e9d054edc8b7bad"
                    onClick={this.addProductToCart}
                    className="adToCart-btn"
                  >
                    Add to Cart <i className="fas fa-cart-plus"></i>
                  </button>{" "}
                </div>
              ) : (
                <button
                  className="selectItem-btn"
                  value="1"
                  onClick={this.showQtyContainer}
                >
                  Select this Item
                </button>
              )}
            </div>
            <div className="promo-video">
              <video className="promo-video__content" autoPlay muted loop>
                <source src="./videos/keychain-facemask.mp4" type="video/mp4" />
                <source
                  src="./videos/keychain-facemask.mp4"
                  type="video/webm"
                />
                Your browser is not supported!
              </video>
            </div>
          </div>
          <div className="product-general-products-container">
            <h2 className="text-center">Another product not defined yet </h2>
            {/* QUANTITY */}
            {this.state.productBeingAdded === "Bunny shirt" ? (
              <div className="qty-container">
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
                  value="5f53e46ac03e493538b78e00"
                  onClick={this.addProductToCart}
                  className="adToCart-btn"
                >
                  Add to Cart <i className="fas fa-cart-plus"></i>
                </button>{" "}
              </div>
            ) : (
              <button
                className="selectItem-btn"
                value="2"
                onClick={this.showQtyContainer}
              >
                Select this Item
              </button>
            )}
          </div>
        </div>
        {/* //modalToCheckout */}
        <Modal
          appElement={document.getElementById("root")}
          // style={customStylesCheckout}
          isOpen={this.state.modalToCheckout}
          className="ModalToCheckOut"
          overlayClassName="Overlay"
        >
          {" "}
          <span className="x-close-modal" onClick={this.closeModalCheckout}>
            X
          </span>
          <button
            onClick={this.trashAllCartItems}
            className="empty-cart-button__checkout-modal"
          >
            <i className="fas fa-trash"></i> Cancel order
          </button>
          {this.state.showCheckout ? (
            <div className="checkout-modal-wrapper">
              {!this.state.checkOutStripe ? (
                <div className="text-center">
                  <h2 className="text-center payment-info-title">
                    Payment Information
                  </h2>
                  <form
                    className="checkout-form"
                    onSubmit={this.submitBillingDetails}
                  >
                    <input
                      className="input-checkout"
                      name="firstName"
                      onChange={this.onChangeHandlerBillingDetails}
                      type="text"
                      placeholder="Full Name"
                    />
                    <input
                      className="input-checkout"
                      name="address"
                      onChange={this.onChangeHandlerBillingDetails}
                      type="text"
                      placeholder="Address"
                    />
                    <input
                      className="input-checkout"
                      name="city"
                      onChange={this.onChangeHandlerBillingDetails}
                      type="text"
                      placeholder="City"
                    />
                    <input
                      className="input-checkout"
                      name="province"
                      onChange={this.onChangeHandlerBillingDetails}
                      type="text"
                      placeholder="Province"
                    />
                    <input
                      className="input-checkout"
                      name="postalCode"
                      onChange={this.onChangeHandlerBillingDetails}
                      type="text"
                      placeholder="Postal Code"
                    />
                    <input
                      className="input-checkout"
                      name="email"
                      onChange={this.onChangeHandlerBillingDetails}
                      type="email"
                      placeholder="Email"
                    />

                    <div className="coupon-container">
                      {this.state.selectedCouponPrice === 0 ? (
                        <input
                          className="input-checkout__coupon"
                          name="couponCodeInput"
                          onChange={this.onChangeHandlerBillingDetails}
                          type="text"
                          placeholder="Type Coupon Code Here"
                        />
                      ) : null}
                      {this.state.errorCoupon === "" ? null : (
                        <p className="coupon-error">{this.state.errorCoupon}</p>
                      )}

                      {this.state.loadingAxiosReq ? (
                        <div className="coupon-results-wrapper">
                          <button className="coupon-btn">Please Wait...</button>
                        </div>
                      ) : (
                        <div
                          className={
                            this.state.selectedCouponPrice === 0
                              ? "coupon-results-wrapper"
                              : "coupon-results-wrapper__applied"
                          }
                        >
                          {this.state.selectedCouponPrice !== 0 ? (
                            <p className="coupon-applied">
                              Coupon Applied <i className="fas fa-check"></i>
                            </p>
                          ) : (
                            <button
                              className="coupon-btn"
                              onClick={this.validateCouponHandler}
                            >
                              Validate Coupon
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <Select
                      className="shippingOptionsSelect"
                      isSearchable={false}
                      menuPlacement="top"
                      placeholder="Choose one"
                      options={shippingOptions}
                      onChange={this.onSelectedShipping}
                    />

                    <p className="text-center error-msg">
                      {this.state.errorMsg}
                    </p>
                    <button className="btn-checkout">Next &#8594;</button>
                  </form>
                  <hr />
                  <button
                    onClick={this.showCheckoutFormHandler}
                    className="checkout-btn-moreProducts"
                  >
                    Back &#8592;
                  </button>
                </div>
              ) : null}

              {this.state.billingDetails ? (
                <CheckoutStripe
                  resetModal={this.closeModalCheckout}
                  firstName={this.state.firstName}
                  email={this.state.email}
                  address={this.state.address}
                  city={this.state.city}
                  province={this.state.province}
                  postalCode={this.state.postalCode}
                  shippingMethod={this.state.shippingMethod}
                  coupon={this.state.selectedCouponPrice}
                  couponName={this.state.selectedCouponName}
                />
              ) : null}
            </div>
          ) : (
            <div>
              <div className="cart-summary-container">
                <h3 className="text-center">Cart Summary</h3>
                {itemsInCartList}
                <p className="cart-info-parag">
                  Subtotal: ${(this.state.subTotal / 100).toFixed(2)}
                </p>
                <p className="cart-info-parag">
                  Tax: ${(this.state.tax / 100).toFixed(2)}
                </p>
                <p className="cart-info-parag">
                  Total: ${(this.state.total / 100).toFixed(2)}
                </p>
              </div>

              <button
                onClick={this.showCheckoutFormHandler}
                className="checkout-btn-moreProducts"
              >
                Checkout
              </button>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

index.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  // cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart.cart,
  // qty: state.qty,
});
//

export default connect(mapStateToProps, {
  getProducts,
  getCart,
  increaseQtyInCart,
  decreaseQtyInCart,
  addItemToCart,
  removeItemFromCart,
  emptyOutCart,
  getSubTotalPrice,
})(index);
