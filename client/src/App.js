import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "./SCSS/Main.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: 0,
      qty: 1,
    };
  }

  setCartToZero = () => {
    this.setState({
      cart: 0,
    });
  };

  setQtyToOne = () => {
    this.setState({
      qty: 1,
    });
  };

  setCartToNewQty = () => {
    this.setState({
      cart: this.state.cart + this.state.qty,
    });
  };

  setCartToPrevQty = () => {
    this.setState({
      cart: this.state.cart - this.state.qty,
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

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar cart={this.state.cart} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/products"
              render={() => (
                <Products
                  resetCart={this.setCartToZero}
                  resetQty={this.setQtyToOne}
                  updateCart={this.setCartToNewQty}
                  updateCartToPrevQty={this.setCartToPrevQty}
                  cart={this.state.cart}
                  qty={this.state.qty}
                  increaseQty={this.increaseQty}
                  decreaseQty={this.decreaseQty}
                />
              )}
            />
            <Route exact path="/contact" component={Contact} />
          </Switch>
          {/* <CardFooter className="footer">
						Alexis Yepes Sanabria 2020 ©{" "}
						<a target="blank" href="https://github.com/alexisyepes/diary-app">
							Click for code reference
						</a>
					</CardFooter> */}
        </div>
      </Router>
    );
  }
}

export default App;
