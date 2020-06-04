import React, { Component } from "react";
import "./style.scss";

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			marginTopPhoto: 1,
			marginRightPhoto: 4,
			fontSize: 30,

			marginTop: 10,
			marginRight: 45,
			width: 90,
		};
	}

	// PHOTO TRANSFORM CONTROLS
	movePhotoUp = () => {
		this.setState((prevState) => ({
			marginTopPhoto: prevState.marginTopPhoto + -5,
		}));
		console.log(this.state.marginTopPhoto);
	};

	movePhotoDown = () => {
		this.setState((prevState) => ({
			marginTopPhoto: prevState.marginTopPhoto + 5,
		}));
	};

	movePhotoLeft = () => {
		this.setState((prevState) => ({
			marginRightPhoto: prevState.marginRightPhoto - 5,
		}));
	};

	movePhotoRight = () => {
		this.setState((prevState) => ({
			marginRightPhoto: prevState.marginRightPhoto + 5,
		}));
	};

	increasePhotoSize = () => {
		this.setState((prevState) => ({
			width: prevState.width + 2,
		}));
	};

	decreasePhotoSize = () => {
		this.setState((prevState) => ({
			width: prevState.width - 2,
		}));
	};

	// TEXT TRANSFORM CONTROLS
	onSelectedChangeColor = async (value) => {
		await this.setState({
			color: value.value,
		});
	};

	moveTextUp = () => {
		this.setState((prevState) => ({
			marginTop: prevState.marginTop + -2,
		}));
	};

	moveTextDown = () => {
		this.setState((prevState) => ({
			marginTop: prevState.marginTop + 2,
		}));
	};

	moveTextLeft = () => {
		this.setState((prevState) => ({
			marginRight: prevState.marginRight + 2,
		}));
	};

	moveTextRight = () => {
		this.setState((prevState) => ({
			marginRight: prevState.marginRight - 2,
		}));
	};

	increaseFont = async () => {
		await this.setState((prevState) => ({
			// counterFontSize: this.state.counterFontSize + 2,
			fontSize: prevState.fontSize + 2,
		}));
	};

	decreaseFont = async () => {
		await this.setState((prevState) => ({
			// counterFontSize: this.state.counterFontSize + 2,
			fontSize: prevState.fontSize - 2,
		}));
	};

	render() {
		return (
			<div className="petTagBone-main-container">
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
				<img
					className="img-product__petTagBone"
					src={this.props.img}
					alt="pillow"
				/>
				{this.props.imagePreviewUrl !== "" ? (
					<div className="img-preview-petTagBone-wrapper">
						<img
							style={{
								width: this.state.width + "%",
								marginLeft: this.state.marginRightPhoto + "%",
								marginTop: this.state.marginTopPhoto + "px",
							}}
							className="product-img-preview-petTagBone"
							src={this.props.imagePreviewUrl}
							alt="bone"
						/>
					</div>
				) : (
					<div className="img-preview-petTagBone-wrapper">
						<img
							style={{
								width: this.state.width + "%",
								marginLeft: this.state.marginRightPhoto + "%",
								marginTop: this.state.marginTopPhoto + "px",
							}}
							className="product-img-preview-petTagBone"
							src="./images/elsa.jpg"
							alt="bone"
						/>
					</div>
				)}
			</div>
		);
	}
}

export default index;
