import React, { Component } from "react";
import "./style.scss";

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			colorBone: "",

			//css
			marginTopPhoto: 1,
			marginRightPhoto: 4,
			fontSize: 30,
			marginTop: 10,
			marginRight: 45,
			width: 90,
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.imagePreviewUrl !== prevProps.imagePreviewUrl) {
			this.setState({
				marginTopPhoto: 1,
				marginRightPhoto: 4,
				fontSize: 30,
				marginTop: 10,
				marginRight: 45,
				width: 90,
			});
		}
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
				{/* PHOTO TRANSFORM CONTROLS */}
				{this.props.imagePreviewUrl ? (
					<div className="photo-controls-container">
						<h3 className="photo-controls-container__heading">Photo Control</h3>
						<div className="photo-controls-container-box">
							<p className="size-title__move text-center">Move</p>
							<p className="size-title__size text-center">Size</p>

							<img
								onClick={this.movePhotoUp}
								className="move-photo-btns move-photo-btns__up"
								src="./images/up-btn.png"
								alt="up"
							/>
							<img
								onClick={this.movePhotoRight}
								className="move-photo-btns move-photo-btns__right"
								src="./images/right-btn.png"
								alt="right"
							/>
							<img
								onClick={this.movePhotoDown}
								className="move-photo-btns move-photo-btns__down"
								src="./images/down-btn.png"
								alt="down"
							/>
							<img
								onClick={this.movePhotoLeft}
								className="move-photo-btns move-photo-btns__left"
								src="./images/left-btn.png"
								alt="left"
							/>
							<img
								onClick={this.increasePhotoSize}
								className="move-photo-btns move-photo-btns__more"
								src="./images/plus-btn.png"
								alt="plus"
							/>
							<img
								onClick={this.decreasePhotoSize}
								className="move-photo-btns move-photo-btns__less"
								src="./images/minus-btn.png"
								alt="minus"
							/>
						</div>
					</div>
				) : null}
				<div className="img-product__petTagBone-wrapper">
					<img
						className="img-product__petTagBone"
						src={this.props.img}
						alt="petTagBone"
					/>
					{this.props.boneColor === "blue" ? (
						<img
							className="img-product__petTagBone"
							src={this.props.img}
							alt="petTagBone"
						/>
					) : null}
					{this.props.boneColor === "pink" ? (
						<img
							className="img-product__petTagBone"
							src="./images/pet-tag-bone-pink.png"
							alt="petTagBone"
						/>
					) : null}
					{this.props.boneColor === "yellow" ? (
						<img
							className="img-product__petTagBone"
							src="./images/pet-tag-bone-yellow.png"
							alt="petTagBone"
						/>
					) : null}
					{this.props.boneColor === "green" ? (
						<img
							className="img-product__petTagBone"
							src="./images/pet-tag-bone-green.png"
							alt="petTagBone"
						/>
					) : null}
					{this.props.boneColor === "brown" ? (
						<img
							className="img-product__petTagBone"
							src="./images/pet-tag-bone-brown.png"
							alt="petTagBone"
						/>
					) : null}

					<h4 className="petTagBone-info petTagBone-info__petName">
						{this.props.petName}
					</h4>
					<h4 className="petTagBone-info petTagBone-info__phone">
						{this.props.phone}
					</h4>
				</div>
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
