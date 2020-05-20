import React, { Component } from "react";

export default class index extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<a className="nav-link" href="/">
									Home <span className="sr-only">(current)</span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/about">
									About
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/products">
									Products
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/contact">
									Contact
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
