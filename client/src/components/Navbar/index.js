import React, { Component } from "react";
import "./style.scss";

export default class index extends Component {
	render() {
		return (
			<nav className="nav-bar-container">
				<ul className="menu">
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
			</nav>
		);
	}
}
