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

	// toggleDesignSquare = async () => {
	// 	this.setState((prevState) => ({
	// 		designSquare: !prevState.designSquare,
	// 	}));
	// };

	render() {
		return (
			<div className="shirt-container">
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
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default index;
