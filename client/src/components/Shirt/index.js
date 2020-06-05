import React, { Component } from "react";
import Select from "react-select";
import "./style.scss";

let optionsColor = [
	{
		value: "black",
		label: "Black",
	},
	{
		value: "white",
		label: "White",
	},
	{
		value: "blue",
		label: "Blue",
	},
	{
		value: "green",
		label: "Green",
	},
	{
		value: "yellow",
		label: "Yellow",
	},
	{
		value: "red",
		label: "Red",
	},
	{
		value: "purple",
		label: "Purple",
	},
	{
		value: "orange",
		label: "Orange",
	},
];

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// css
			marginTopPhoto: 10,
			marginRightPhoto: 46.6,
			width: 6,
			marginTop: 10,
			marginRight: -10,
			fontSize: 30,
			color: "",
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.imagePreviewUrl !== prevProps.imagePreviewUrl) {
			this.setState({
				marginTopPhoto: 10,
				marginRightPhoto: 46.6,
				width: 6,
			});
		}
	}

	// PHOTO TRANSFORM CONTROLS
	movePhotoUp = () => {
		this.setState((prevState) => ({
			marginTopPhoto: prevState.marginTopPhoto + -2,
		}));
	};

	movePhotoDown = () => {
		this.setState((prevState) => ({
			marginTopPhoto: prevState.marginTopPhoto + 2,
		}));
	};

	movePhotoLeft = () => {
		this.setState((prevState) => ({
			marginRightPhoto: prevState.marginRightPhoto - 0.5,
		}));
	};

	movePhotoRight = () => {
		this.setState((prevState) => ({
			marginRightPhoto: prevState.marginRightPhoto + 0.5,
		}));
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
			<div className="shirt-container">
				{this.props.imagePreviewUrl ? (
					<div className="photo-controls-container">
						<h3 className="photo-controls-container__heading">
							Transform Photo
						</h3>
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
				<div className="img-product-container text-center">
					<button onClick={this.props.toggleDesignSquare} className="hide-x">
						Hide / Show &#8595;
					</button>
					{this.props.showGuide ? (
						<img
							className="img-product__shirt"
							src="./images/shirt-empty.png"
							alt="shirt empty"
						/>
					) : (
						<img
							className="img-product__shirt"
							src={this.props.img}
							alt="shirt"
						/>
					)}

					{this.props.imagePreviewUrl !== "" ? (
						<img
							style={{
								width: this.state.width + "%",
								left: this.state.marginRightPhoto + "%",
								marginTop: this.state.marginTopPhoto + "px",
							}}
							className="img-preview__shirt"
							src={this.props.imagePreviewUrl}
							alt="shirt"
						/>
					) : null}
				</div>
				<div className="text-container-shirts-parent">
					<div className="text-on-shirts">
						<h3
							className="text-on-shirts__container text-center"
							style={{
								marginTop: this.state.marginTop + "px",
								marginRight: this.state.marginRight + "px",
								fontSize: this.state.fontSize + "px",
								color: this.state.color,
							}}
						>
							{this.props.textOnMugs}
						</h3>
					</div>
				</div>
				<div className="mugs-container__back">
					{this.props.textOnMugs && this.props.textFormatOptions ? (
						// TEXT FORMAT CONTROL/////////////////////
						<div className="parent-container-text-control">
							<div className="move-text-btns-container">
								<h2 className="move-text-btns__font-title">
									&#x21e1; TEXT OPTIONS &#x21e1;
								</h2>
								<Select
									menuPlacement="top"
									placeholder="Text color"
									className="move-text-btns move-text-btns__font-color"
									onChange={this.onSelectedChangeColor}
									options={optionsColor}
								/>
								<button
									className="move-text-btns move-text-btns__up"
									onClick={this.moveTextUp}
								>
									Move text Up &#x21e7;
								</button>
								<button
									className="move-text-btns move-text-btns__down"
									onClick={this.moveTextDown}
								>
									Move text Down &#x21e9;
								</button>
								<button
									className="move-text-btns move-text-btns__left"
									onClick={this.moveTextLeft}
								>
									Move text Left &#x21e6;
								</button>
								<button
									className="move-text-btns move-text-btns__right"
									onClick={this.moveTextRight}
								>
									Move text Right &#x21e8;
								</button>
								<button
									className="move-text-btns move-text-btns__increase-font"
									onClick={this.increaseFont}
								>
									Increase Font &#x2b;
								</button>
								<button
									className="move-text-btns move-text-btns__decrease-font"
									onClick={this.decreaseFont}
								>
									Decrease Font &#x2212;
								</button>
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default index;
