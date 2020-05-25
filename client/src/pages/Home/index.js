import React, { Component } from "react";
import "./style.scss";

export default class index extends Component {
	render() {
		return (
			<div className="home-container">
				<h1 className="home__heading text-center">Memories that matter...</h1>
				<div className="image-home-parent">
					<img
						className="home-images"
						src="./images/varios.jpg"
						alt="keychain"
					/>
					<img className="home-images" src="./images/mug.jpg" alt="keychain" />
					<img
						className="home-images"
						src="./images/keychains.jpg"
						alt="keychain"
					/>
					<img
						className="home-images"
						src="./images/pillow.jpg"
						alt="keychain"
					/>
				</div>
				<div className="text-center">
					<a href="/products">
						<button className="home-button">Create my Product...</button>
					</a>
				</div>
			</div>
		);
	}
}
