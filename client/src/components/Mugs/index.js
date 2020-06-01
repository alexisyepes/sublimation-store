import React, { Component, Fragment } from "react";
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

		// this.textRef = createRef();

		this.state = {
			// css
			counter: 50,
			marginTop: "10px",
			marginDown: null,
			marginRight: -10,
			marginLeft: null,
			counterCss: null,
			counterCssSides: null,
			counterFontSize: 35,
			fontSize: null,
			color: "",
		};
	}

	onSelectedChangeColor = async (value) => {
		await this.setState({
			color: value.value,
		});
	};

	decreaseCounter = async () => {
		await this.setState({
			counterCss: this.state.counterCss - 10,
		});
		this.moveDownText();
	};

	increaseCounter = async () => {
		await this.setState({
			counterCss: this.state.counterCss + 10,
		});
		this.moveDownText();
	};

	increaseCounterSides = async () => {
		await this.setState({
			counterCssSides: this.state.counterCssSides + 10,
			marginRight: this.state.counterCssSides + "px",
		});
	};

	decreaseCounterSides = async () => {
		let counter = this.state.counterCssSides;

		await this.setState({
			counterCssSides: this.state.counterCssSides - 10,
			marginRight: counter + "px",
		});
	};

	increaseFont = async () => {
		await this.setState({
			counterFontSize: this.state.counterFontSize + 2,
			fontSize: this.state.counterFontSize + "px",
		});
	};

	decreaseFont = async () => {
		await this.setState({
			counterFontSize: this.state.counterFontSize - 2,
			fontSize: this.state.counterFontSize + "px",
		});
	};

	moveDownText = async () => {
		await this.setState({
			marginTop: this.state.counterCss + "px",
		});
	};

	render() {
		return (
			<Fragment>
				<div className="mugs-container">
					<p className="product-sides product-sides__a">Side A &#8594;</p>
					<div className="mugs-container__front">
						<div>
							<img
								className="product-img "
								src={this.props.productImg}
								alt="product"
							/>
							{this.props.imagePreviewUrl.length > 0 ? (
								<img
									className="product-img-preview-mug"
									src={this.props.imagePreviewUrl}
									alt="temp"
								/>
							) : null}
						</div>
					</div>

					<p className="product-sides product-sides__b">&#8592; Side B</p>
					<div className="mugs-container__back">
						<img
							className="product-img__back "
							src={this.props.productImgBack}
							alt="product"
						/>
						<div className="text-on-mugs">
							<h3
								className="text-on-mugs__container text-center"
								style={{
									marginTop: this.state.marginTop,
									marginDown: this.state.marginDown,
									marginRight: this.state.marginRight,
									marginLeft: this.state.marginLeft,
									fontSize: this.state.fontSize,
									color: this.state.color,
								}}
							>
								{this.props.textOnMugs}
							</h3>
						</div>
						{this.props.textOnMugs && this.props.textFormatOptions ? (
							// TEXT FORMAT CONTROL/////////////////////
							<div className="move-text-btns-container text-center">
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
									onClick={this.decreaseCounter}
								>
									Move text Up &#x21e7;
								</button>
								<button
									className="move-text-btns move-text-btns__down"
									onClick={this.increaseCounter}
								>
									Move text Down &#x21e9;
								</button>
								<button
									className="move-text-btns move-text-btns__left"
									onClick={this.increaseCounterSides}
								>
									Move text Left &#x21e6;
								</button>
								<button
									className="move-text-btns move-text-btns__right"
									onClick={this.decreaseCounterSides}
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
						) : null}
						{/* BACKGROUND IMAGE MUGS */}
						{this.props.bg.length > 0 ? (
							<div className="bg-container-mugs text-center">
								<img className="bg-image-mug" src={this.props.bg} alt="bg" />
							</div>
						) : null}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default index;
