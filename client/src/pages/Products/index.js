import React, { Component } from "react";
import Select from "react-select";
import "./style.scss";

let optionsBackgrounds = [
	{
		value: "",
		label: "None",
	},
	{
		value: "./images/backgrounds/blue-balls.png",
		label: "Blue",
	},
	{
		value: "./images/backgrounds/blue-purpple.png",
		label: "Purple",
	},
	{
		value: "./images/backgrounds/green.png",
		label: "Green",
	},
	{
		value: "./images/backgrounds/grey.png",
		label: "Grey",
	},
	{
		value: "./images/backgrounds/pink-balls.png",
		label: "Pink",
	},
	{
		value: "./images/backgrounds/yellow-dots.png",
		label: "Yellow",
	},
	{
		value: "./images/backgrounds/party.png",
		label: "Party",
	},
];

export default class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			btnStep1: true,
			btnStep2: false,
			btnStep3: false,
			toggleStep1: false,
			toggleStep2: false,
			toggleStep3: false,
			toggleSelectProductBtn: true,
			step1: false,
			step2: false,
			step3: false,
			productImgArray: [
				{
					mug1: "./images/mug.png",
					mug2: "./images/mug-back.png",
				},
				"https://cdn.shopify.com/s/files/1/0698/0337/products/l44473_1000x.jpg?v=1516225584",
				"https://images-na.ssl-images-amazon.com/images/I/61zYvzxjdHL._AC_SL1500_.jpg",
				"https://5.imimg.com/data5/PD/DM/MY-13899650/blank-white-square-keychain-rings-for-sublimation-500x500.jpg",
			],
			productImg: "",
			productImgBack: "",
			finalProductImg: null,
			file: "",
			imagePreviewUrl: "",
			bg: "",
			textOnMugs: "",
			counter: 50,

			// css
			marginTop: "",
			marginDown: "",
			counterCss: 0,
			// counterLessCss: 0,
		};
	}

	handleToggleStep1 = () => {
		this.setState({
			toggleStep1: !this.state.toggleStep1,
		});
	};

	handleToggleStep2 = () => {
		this.setState({
			toggleStep2: !this.state.toggleStep2,
		});
	};
	handleToggleStep3 = () => {
		this.setState({
			toggleStep3: !this.state.toggleStep3,
			btnStep3: !this.state.btnStep3,
		});
	};

	handleMugImg = () => {
		this.setState({
			productImg: this.state.productImgArray[0].mug1,
			productImgBack: this.state.productImgArray[0].mug2,
		});
	};

	handleHatImg = () => {
		this.setState({
			productImg: this.state.productImgArray[1],
			productImgBack: "",
		});
	};

	handlePillowcaseImg = () => {
		this.setState({
			productImg: this.state.productImgArray[2],
			productImgBack: "",
		});
	};

	handleKeychainImg = () => {
		this.setState({
			productImg: this.state.productImgArray[3],
			productImgBack: "",
		});
	};

	productSelectedConfirmed = () => {
		this.setState({
			btnStep1: false,
			btnStep2: true,
			btnStep3: false,
			toggleStep1: false,
			toggleStep3: false,
			toggleStep2: true,
			toggleSelectProductBtn: false,
		});
	};

	fileSelectedHandler = async (event) => {
		await this.setState({
			finalProductImg: event.target.files[0],
		});
		const fd = new FormData();
		fd.append("file", this.state.finalProductImg);
		console.log(this.state.finalProductImg);
		// this.fileUploadHandler();
	};

	_handleImageChange = (e) => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result,
			});
		};

		reader.readAsDataURL(file);
	};

	updateComponent = () => {
		this.setState({
			btnStep1: true,
			btnStep2: false,
			btnStep3: false,
			toggleStep1: false,
			toggleStep2: false,
			toggleStep3: false,
			toggleSelectProductBtn: true,
			step1: false,
			step2: false,
			step3: false,
			productImg: "",
			productImgBack: "",
			imagePreviewUrl: "",
			bg: "",
			textOnMugs: "",
		});
	};

	onSelectedChange = async (value) => {
		await this.setState({
			bg: value.value,
		});
		console.log(this.state.bg);
	};

	onChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	increaseCounter = async () => {
		await this.setState({
			counterCss: this.state.counterCss + 10,
		});
		this.moveDownText();
	};

	decreaseCounter = async () => {
		await this.setState({
			counterCss: this.state.counterCss - 10,
		});
		this.moveDownText();
	};

	moveDownText = async () => {
		await this.setState({
			marginTop: this.state.counterCss + "px",
		});
	};

	moveUpText = async () => {
		await this.setState({
			marginDown: this.state.counterLessCss + "px",
		});
	};

	render() {
		return (
			<div className="product-creation-container">
				<h1 className="home__heading text-center">
					Create your product in 3 easy steps
				</h1>
				<div className="steps-parent">
					<div className="steps-container">
						<button
							onClick={this.handleToggleStep1}
							className="step-btn step-btn__1"
							value={this.state.btnstep1}
							disabled={this.state.btnStep2}
						>
							STEP 1
						</button>
						{this.state.toggleStep1 ? (
							<div className="text-center">
								<h1>Choose one product below</h1>
								<h2 className="product-select" onClick={this.handleMugImg}>
									Mug
								</h2>
								<h2 className="product-select" onClick={this.handleHatImg}>
									Hat
								</h2>
								<h2
									className="product-select"
									onClick={this.handlePillowcaseImg}
								>
									Pillowcase
								</h2>
								<h2 className="product-select" onClick={this.handleKeychainImg}>
									Keychain
								</h2>
							</div>
						) : null}
						<button
							onClick={this.handleToggleStep2}
							className="step-btn step-btn__2"
							disabled={this.state.btnStep1 || this.state.btnStep2}
							value={this.state.btnstep2}
						>
							STEP 2
						</button>
						{this.state.toggleStep2 ? (
							<div className="text-center">
								<hr />
								<h2 className="heading-product heading-product__upload">
									&darr; UPLOAD YOUR PHOTO &darr;
								</h2>
								<hr />
								<input
									className="input-img"
									type="file"
									onChange={this._handleImageChange}
								/>
								<hr />
								<h2 className="heading-product heading-product__bg">
									&darr; CHOOSE BACKGROUND (Optional) &darr;
								</h2>
								<Select
									options={optionsBackgrounds}
									onChange={this.onSelectedChange}
								/>
								<hr />
								<h2 className="heading-product heading-product__message">
									&darr; ADD A MESSAGE &darr;{" "}
									{50 - this.state.textOnMugs.length + " letters left"}
								</h2>
								<textarea
									maxLength="50"
									className="text-msg-input"
									placeholder="Add your message here"
									name="textOnMugs"
									onChange={this.onChangeHandler}
									type="text"
								/>
							</div>
						) : null}
						<div>
							<button
								onClick={this.handleToggleStep3}
								className="step-btn step-btn__3"
								disabled={this.state.btnStep1 || this.state.btnStep2}
								value={this.state.btnstep3}
							>
								STEP 3
							</button>
							{this.state.toggleStep3 ? <h3>Add to cart</h3> : null}
						</div>
					</div>
					<div className="virtual-image-container">
						<h1 className="text-center">MY PRODUCT</h1>
						{this.state.productImg.length > 0 ? (
							<div className="product-image-container text-center">
								{this.state.toggleSelectProductBtn ? (
									<button
										onClick={this.productSelectedConfirmed}
										className="confirm-product-button"
									>
										&#10003; Confirm product and continue to step 2
									</button>
								) : (
									<div>
										<button
											onClick={this.updateComponent}
											className="startOver-button"
										>
											&#8634; Click here to reset and start Over
										</button>
										{this.state.imagePreviewUrl.length > 0 ||
										this.state.textOnMugs !== "" ? (
											<button className="continue-button">
												Click here to Continue &#10003;
											</button>
										) : null}
									</div>
								)}
								{this.state.productImgArray[0].mug1.length > 0 ? (
									<div className="mugs-container">
										<div className="mugs-container__front">
											<div>
												<img
													className="product-img "
													src={this.state.productImg}
													alt="product"
												/>
												{this.state.imagePreviewUrl.length > 0 ? (
													<img
														className="product-img-preview-mug"
														src={this.state.imagePreviewUrl}
														alt="temp"
													/>
												) : null}
											</div>
										</div>
										<div className="mugs-container__back">
											<div>
												<img
													className="product-img__back "
													src={this.state.productImgBack}
													alt="product"
												/>
												<div className="text-on-mugs">
													<h3
														style={{
															marginTop: this.state.marginTop,
															marginDown: this.state.marginDown,
														}}
														className="text-on-mugs__container text-center"
													>
														{this.state.textOnMugs}
													</h3>
												</div>
												{this.state.textOnMugs ? (
													<div className="move-text-btns tex-center">
														<button
															className="move-text-btns__down"
															onClick={this.increaseCounter}
														>
															Move text Down
														</button>
														<button
															className=" move-text-btns__up"
															onClick={this.decreaseCounter}
														>
															Move text Up
														</button>
													</div>
												) : null}
												{this.state.bg.length > 0 ? (
													<div className="bg-container-mugs text-center">
														<img
															className="bg-image-mug"
															src={this.state.bg}
															alt="bg"
														/>
													</div>
												) : null}
											</div>
										</div>
									</div>
								) : null}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}
