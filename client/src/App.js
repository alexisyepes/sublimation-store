import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import GeneralProducts from "./pages/GeneralProducts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./SCSS/Main.scss";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/gallery" component={Gallery} />
            <Route
              exact
              path="/general_products"
              render={() => <GeneralProducts />}
            />
            <Route exact path="/products" render={() => <Products />} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
