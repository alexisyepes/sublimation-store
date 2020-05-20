import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
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
						<Route exact path="/products" component={Products} />
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
