import React, { Component } from "react";
import Select from "react-select";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import Modal from "react-modal";
// import axios from "axios";
import CheckoutStripe from "../../components/StripeForm";
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

const customStylesCheckout = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "white",
		color: "black",
		borderRadius: "5px",
		width: "600px",
		overflow: "visible",
	},
	overlay: { zIndex: 1000 },
};

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "black",
		color: "white",
		borderRadius: "5px",
	},
	overlay: { zIndex: 1000 },
};

const product = [
	{
		Mug: {
			name: "mug",
			price: 1200,
		},
		PetTag: {
			name: "petTag",
			price: 2000,
		},
		Shirt: {
			name: "shirt",
			price: 1400,
		},
		Pillow: {
			name: "pillow",
			price: 1600,
		},
	},
];

export default class index extends Component {
	constructor(props) {
		super(props);

		// this.textRef = createRef();

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
			fileArray: [],
			imagePreviewUrl: "",
			imgPreviewArray: [],
			screenshot: [],
			bg: "",
			textOnMugs: "",
			counter: 50,
			modalToConfirm: false,
			modalToCheckout: false,
			notChecked: true,
			errorMsg: "",
			textFormatOptions: false,
			mugPrice: 0,
			productToPay: [],
			cart: 0,
			firstName: "",
			email: "",
			billingDetails: false,
			checkOutStripe: false,
			showMsgInput: false,

			// css
			marginTop: "10px",
			marginDown: null,
			marginRight: -10,
			marginLeft: null,
			counterCss: null,
			counterCssSides: null,
			counterFontSize: 35,
			fontSize: null,
		};
	}

	componentWillMount() {
		Modal.setAppElement("body");
	}

	toggleModalToConfirmOrder = () => {
		this.setState({
			modalToConfirm: true,
		});
	};

	modalToCheckoutOpen = () => {
		if (!this.state.modalToCheckout) {
			this.setState({
				firstName: "",
				email: "",
				billingDetails: false,
				checkOutStripe: false,
			});
		}
		this.setState({
			modalToCheckout: true,
		});
	};

	closeModal = () => {
		this.setState({
			modalToConfirm: false,
		});
	};

	closeModalCheckout = () => {
		this.setState({
			modalToCheckout: false,
		});
	};

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
			mugPrice: 12.0,
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
		// console.log(this.state.finalProductImg);
		// this.fileUploadHandler();
	};

	_handleImageChange = (e) => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		if (file && file.type.match("image.*")) {
			reader.readAsDataURL(file);
		}

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result,
				// imagePreviewUrl: [...this.state.imagePreviewUrl, reader.result], to add to array
			});
		};
	};

	updateComponent = () => {
		if (
			window.confirm(
				`Are you sure you wish to empty your cart? This operation cannot be reversed!`
			)
		) {
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
				notChecked: true,
				cart: [],
				productToPay: [],
				showMsgInput: false,
			});
		}
	};

	resetForNewProduct = () => {
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
			notChecked: true,
		});
	};

	onSelectedChange = async (value) => {
		await this.setState({
			bg: value.value,
		});
	};

	onSelectedChangeColor = async (value) => {
		await this.setState({
			color: value.value,
		});
	};

	onChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			textFormatOptions: true,
		});
	};

	onChangeHandlerBillingDetails = (e) => {
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

	moveDownText = async () => {
		await this.setState({
			marginTop: this.state.counterCss + "px",
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

	screenshot = async () => {
		if (this.state.notChecked === true) {
			return this.setState({
				errorMsg: "Check box before continuing",
			});
		}
		this.toggleModalToConfirmOrder();

		await html2canvas(document.getElementById("product-screen-container")).then(
			async (canvas) => {
				// zip and convert
				var zip = new JSZip();
				var savable = new Image();
				savable.src = canvas.toDataURL("image/jpeg", 0.5);
				zip.file(
					"image.png",
					savable.src.substr(savable.src.indexOf(",") + 1),
					{
						base64: true,
					}
				);
				// console.log(savable.src);

				await this.setState({
					fileArray: [...this.state.fileArray, this.state.file],
					screenshot: [...this.state.screenshot, savable.src],
					toggleStep3: true,
					toggleStep2: false,
					textFormatOptions: false,
					productToPay: this.state.productToPay.concat(product[0].Mug.price),
					cart: this.state.cart + 1,
				});
				console.log(this.state.fileArray);
			}
		);
	};

	goBackToStep2 = async () => {
		await this.setState({
			toggleStep3: false,
			toggleStep2: true,
			textFormatOptions: true,
			notChecked: true,
			cart: this.state.cart - 1,
			productToPay: this.state.productToPay.slice(0, -1),
			fileArray: this.state.fileArray.slice(0, -1),
			screenshot: this.state.screenshot.slice(0, -1),
			imagePreviewUrl: "",
		});
		console.log(this.state.fileArray);
	};

	toggleChangeTermsAndConditions = () => {
		if (this.state.notChecked) {
			this.setState({
				errorMsg: "",
			});
		}
		this.setState({
			notChecked: !this.state.notChecked,
		});
	};

	submitBillingDetails = (e) => {
		e.preventDefault();
		if (!this.state.firstName || !this.state.email) {
			return this.setState({
				errorMsg: "All the fields are required!",
			});
		}
		this.setState({
			billingDetails: true,
			checkOutStripe: true,
		});
	};

	handleFocusRef = () => {
		this.setState({
			showMsgInput: true,
		});
		// this.textRef.current.focus();
	};

	render() {
		return (
			<div className="product-creation-container">
				<h1 className="home__heading text-center">
					Create your product in 3 easy steps{" "}
				</h1>
				{this.state.cart > 0 && !this.state.modalToCheckout ? (
					<div onClick={this.modalToCheckoutOpen} className="cart-container">
						<span aria-label="0" role="img">
							&#128722; {this.state.cart}
						</span>
					</div>
				) : null}
				<div id="product-screen-container" className="steps-parent">
					{/* STEPS */}
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
							<h1 className="text-center arrowToRight">
								Build your product &#x21f6;
							</h1>
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
							{this.state.toggleStep3 ? (
								<div className="order-summary text-center">
									<h1 className="text-center arrowToRight arrowDown">
										&#8659;
									</h1>
									<p>Individual Item Price: ${this.state.mugPrice}</p>
									<p>Tax: ${0.13 * this.state.mugPrice}</p>
									<hr />
									<p>
										Total in Cart: $
										{this.state.productToPay.reduce((a, b) => a + b) * 0.01 +
											this.state.productToPay.reduce((a, b) => a + b) *
												0.01 *
												0.13}{" "}
										<span aria-label="0" role="img">
											&#128722;
										</span>
										<button
											onClick={this.updateComponent}
											className="empty-cart-button"
										>
											<i className="fas fa-trash"></i> Empty cart
										</button>
									</p>
									<div className="btns-checkout">
										<button
											onClick={this.goBackToStep2}
											className="modify-product-btn"
										>
											Modify my product {""}
											<span aria-label="0" role="img">
												<i className="fas fa-cog"></i>
											</span>
										</button>

										<button
											onClick={this.resetForNewProduct}
											className="btns-checkout btns-checkout__create-product"
										>
											&#x271C; Create more products {""}
										</button>
										<button
											onClick={this.modalToCheckoutOpen}
											className="btns-checkout btns-checkout__checkout"
										>
											Checkout now{" "}
											<span aria-label="0" role="img">
												&#128722;
											</span>
										</button>
									</div>
								</div>
							) : null}
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
										<span aria-label="0" role="img">
											{" "}
											&#10003;
										</span>
										Confirm product and continue to step 2
									</button>
								) : (
									<div className="startover-btn-container">
										<button
											onClick={this.updateComponent}
											className="startOver-button"
										>
											&#8634; (Empty cart) Reset and start Over
										</button>
									</div>
								)}
								{this.state.productImgArray[0].mug1.length > 0 ? (
									<div className="mugs-container">
										<p className="product-sides product-sides__a">
											Side A &#8594;
										</p>
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

										<p className="product-sides product-sides__b">
											&#8592; Side B
										</p>
										<div className="mugs-container__back">
											<img
												className="product-img__back "
												src={this.state.productImgBack}
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
													{this.state.textOnMugs}
												</h3>
											</div>
											{this.state.textOnMugs && this.state.textFormatOptions ? (
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
											{this.state.bg.length > 0 ? (
												<div className="bg-container-mugs text-center">
													<img
														style={
															this.state.textOnMugs.lenght > 0
																? { height: "65%" }
																: { height: "85%" }
														}
														className="bg-image-mug"
														src={this.state.bg}
														alt="bg"
													/>
												</div>
											) : null}
										</div>
									</div>
								) : null}
							</div>
						) : (
							<div className="arrowToLeft">
								<h1 className="text-center">&#x21da; Begin with step 1</h1>
							</div>
						)}
						{this.state.toggleStep2 ? (
							<div className="text-center step-2-container">
								{/* CONTROLS TO ADD CONTENT ON MUGS */}
								<h2
									onClick={() => {
										this.fileInput.click();
									}}
									className="heading-product heading-product__upload text-center"
								>
									&#x2912; CLICK TO UPLOAD PHOTO
								</h2>
								<Select
									className="background-select"
									menuPlacement="top"
									placeholder="Choose background (optional)"
									options={optionsBackgrounds}
									onChange={this.onSelectedChange}
								/>
								<input
									ref={(fileInput) => (this.fileInput = fileInput)}
									className="input-img"
									type="file"
									onChange={this._handleImageChange}
									style={{ display: "none" }}
								/>
								<h2
									onClick={this.handleFocusRef}
									className="heading-product heading-product__message"
								>
									&darr; ADD A MESSAGE &darr;{" "}
									{50 - this.state.textOnMugs.length + " letters left"}
								</h2>
								{this.state.showMsgInput ? (
									<div className="text-area-container">
										<textarea
											// ref={this.textRef}
											maxLength="50"
											className="text-msg-input "
											placeholder="Type your message here"
											name="textOnMugs"
											onChange={this.onChangeHandler}
											type="text"
										/>
									</div>
								) : null}
								{this.state.imagePreviewUrl.length > 0 ||
								this.state.textOnMugs !== "" ? (
									<div className="continue-button-container">
										<p className="agree-with-order">
											<input
												className="checkbox-order"
												onChange={this.toggleChangeTermsAndConditions}
												type="checkbox"
												name="checkbox"
												value={this.state.notChecked}
											/>
											<b> I confirm my order is accurate</b>
										</p>
										<p className="error-msg-confirm-product color-yellow">
											{this.state.errorMsg}
										</p>
										<button
											onClick={this.screenshot}
											className="continue-button"
										>
											Click here if you're done &#10003;
										</button>
									</div>
								) : null}
							</div>
						) : null}

						{/* Modal Confirming creation of product */}
						<Modal
							style={customStyles}
							isOpen={this.state.modalToConfirm}
							onRequestClose={this.closeModal}
						>
							<span className="x-close-modal" onClick={this.closeModal}>
								X
							</span>
							<h2 className="text-center">
								Your product has been created! You can procceed to step 3
							</h2>
						</Modal>

						{/* Modal To Checkout */}
						<Modal
							style={customStylesCheckout}
							isOpen={this.state.modalToCheckout}
							// onRequestClose={this.closeModalCheckout}
						>
							<span className="x-close-modal" onClick={this.closeModalCheckout}>
								X
							</span>

							{!this.state.checkOutStripe ? (
								<form
									className="checkout-form"
									onSubmit={this.submitBillingDetails}
								>
									<h3 className="text-center">
										Fill out your information to checkout
									</h3>
									<input
										className="input-checkout"
										name="firstName"
										onChange={this.onChangeHandlerBillingDetails}
										type="text"
										placeholder="Full Name"
									/>
									<input
										className="input-checkout"
										name="email"
										onChange={this.onChangeHandlerBillingDetails}
										type="email"
										placeholder="Email"
									/>
									<button className="btn-checkout">Next &#8594;</button>
									<p className="text-center error-msg">{this.state.errorMsg}</p>
								</form>
							) : null}

							{this.state.billingDetails ? (
								<CheckoutStripe
									screenshot={this.state.screenshot}
									imgForProduct={this.state.fileArray}
									firstName={this.state.firstName}
									email={this.state.email}
									productWithCents={
										this.state.productToPay.length > 0
											? this.state.productToPay.reduce((a, b) => a + b) * 0.01 +
											  this.state.productToPay.reduce((a, b) => a + b) *
													0.01 *
													0.13
											: null
									}
									product={
										this.state.productToPay.length > 0
											? this.state.productToPay.reduce((a, b) => a + b) * 0.13 +
											  this.state.productToPay.reduce((a, b) => a + b)
											: 0
									}
								/>
							) : null}
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}
