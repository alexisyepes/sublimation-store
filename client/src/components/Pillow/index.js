import React, { Component } from "react";
import "./style.scss";

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			marginTop: 10,
			marginRight: 45,
			width: 7,
			widthCounter: 0,
		};
	}

	movePhotoUp = () => {
		this.setState((prevState) => ({
			marginTop: prevState.marginTop + -2,
		}));
	};

	movePhotoDown = () => {
		this.setState((prevState) => ({
			marginTop: prevState.marginTop + 2,
		}));
	};

	movePhotoLeft = () => {
		this.setState((prevState) => ({
			marginRight: prevState.marginRight - 0.5,
		}));
		console.log(this.state.marginRight);
	};

	movePhotoRight = () => {
		this.setState((prevState) => ({
			marginRight: prevState.marginRight + 0.5,
		}));
		console.log(this.state.marginRight);
	};

	increasePhotoSize = () => {
		this.setState((prevState) => ({
			width: prevState.width + 0.5,
		}));
	};

	decreasePhotoSize = () => {
		this.setState((prevState) => ({
			width: prevState.width - 0.5,
		}));
	};

	render() {
		return (
			<div className="image-product-container-pillow text-center">
				{this.props.imagePreviewUrl ? (
					<div className="photo-controls-container">
						<h3 className="photo-controls-container__heading">
							Transform Photo
						</h3>
						<div className="photo-controls-container-box">
							<button
								onClick={this.movePhotoUp}
								className="photo-controls-container__btns photo-controls-container__btns__up"
							>
								Up
							</button>
							<button
								onClick={this.movePhotoDown}
								className="photo-controls-container__btns photo-controls-container__btns__down"
							>
								Down
							</button>
							<button
								onClick={this.movePhotoLeft}
								className="photo-controls-container__btns photo-controls-container__btns__left"
							>
								Left
							</button>
							<button
								onClick={this.movePhotoRight}
								className="photo-controls-container__btns photo-controls-container__btns__right"
							>
								Right
							</button>
							<br />
							<button
								onClick={this.increasePhotoSize}
								className="photo-controls-container__btns photo-controls-container__btns__more"
							>
								+
							</button>
							<button
								onClick={this.decreasePhotoSize}
								className="photo-controls-container__btns photo-controls-container__btns__less"
							>
								-
							</button>
						</div>
					</div>
				) : null}
				<button onClick={this.props.toggleDesignSquare} className="hide-x">
					Max Area Hide / Show &#8595;
				</button>
				{!this.props.showGuide ? (
					<img
						className="img-product__pillow"
						src="./images/pillowcase-markings.png"
						alt="pillow empty"
					/>
				) : (
					<img
						className="img-product__pillow"
						src={this.props.img}
						alt="pillow"
					/>
				)}

				{this.props.imagePreviewUrl !== "" ? (
					<div className="img-preview-pillow-container">
						<img
							style={{
								width: this.state.width + "%",
								left: this.state.marginRight + "%",
								marginTop: this.state.marginTop + "px",
							}}
							className="product-img-preview-pillow"
							src={this.props.imagePreviewUrl}
							alt="shirt"
						/>
					</div>
				) : null}
			</div>
		);
	}
}

export default index;
