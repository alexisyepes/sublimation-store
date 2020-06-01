import React, { Component } from "react";
import Select from "react-select";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import Modal from "react-modal";
// import axios from "axios";
import CheckoutStripe from "../../components/StripeForm";
import Mugs from "../../components/Mugs";

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
			qty: 1,
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
				qty: 1,
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
			qty: 1,
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

	increaseQty = () => {
		this.setState({
			qty: this.state.qty + 1,
		});
	};

	decreaseQty = () => {
		if (this.state.qty === 1) {
			return;
		}
		this.setState({
			qty: this.state.qty - 1,
		});
	};

	screenshot = async () => {
		if (this.state.notChecked === true) {
			return this.setState({
				errorMsg: "Confirm before continuing",
			});
		}
		if (this.state.file === "") {
			return alert("A photo is required to procceed, please upload one.");
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
					productToPay: this.state.productToPay.concat(
						product[0].Mug.price * this.state.qty
					),
					cart: this.state.cart + this.state.qty,
				});
				// console.log(this.state.fileArray);
			}
		);
	};

	goBackToStep2 = async () => {
		if (
			window.confirm(
				`If you continue, your progress will be lost and you will need to re-create this product and its quantities. \nDo you still want to procceed?`
			)
		) {
			await this.setState({
				toggleStep3: false,
				toggleStep2: true,
				textFormatOptions: true,
				notChecked: true,
				cart: this.state.cart - this.state.qty,
				qty: 1,
				productToPay: this.state.productToPay.slice(0, -1),
				fileArray: this.state.fileArray.slice(0, -1),
				screenshot: this.state.screenshot.slice(0, -1),
				imagePreviewUrl: "",
				file: "",
			});
		}
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
						{/* step 1 Container */}
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

						{/* step 2 Container */}
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

						{/* step 3 Container */}
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
									<p>
										Individual Item Price: $
										{this.state.mugPrice * this.state.qty}
									</p>
									<p>Tax: ${0.13 * this.state.mugPrice * this.state.qty}</p>
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
						{/* step 3 Container ENDS***********************/}
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
									<Mugs
										productImg={this.state.productImg}
										productImgBack={this.state.productImgBack}
										imagePreviewUrl={this.state.imagePreviewUrl}
										bg={this.state.bg}
										textOnMugs={this.state.textOnMugs}
										textFormatOptions={this.state.textFormatOptions}
									/>
								) : null}
							</div>
						) : (
							<div className="arrowToLeft">
								<h1 className="text-center">&#x21da; Begin with step 1</h1>
							</div>
						)}
						{this.state.toggleStep2 ? (
							<div className="step-2-container">
								{/* MUGS */}
								<div className="  controls-to-add-content-to-mugs">
									{/* CONTROLS TO ADD CONTENT ON MUGS */}
									{/* QUANTITY */}
									<div className="qty-container">
										<h4 className="h2-qty">
											QTY:
											<div className="qty-symbols qty-symbols__number">
												{this.state.qty}
											</div>
											<button
												onClick={this.increaseQty}
												className="qty-symbols qty-symbols__plus"
											>
												+
											</button>
											<button
												onClick={this.decreaseQty}
												className="qty-symbols qty-symbols__minus"
											>
												-
											</button>{" "}
										</h4>
									</div>
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
										&darr; CLICK TO ADD A MESSAGE &darr;{" "}
										{50 - this.state.textOnMugs.length + " letters left"}
									</h2>
									{this.state.showMsgInput ? (
										<div className="text-area-container">
											<textarea
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
												<b> I confirm my product is accurate</b>
											</p>
											{this.state.errorMsg ? (
												<p className="error-msg-confirm-product color-yellow">
													&#8593; {this.state.errorMsg}
												</p>
											) : null}
											<button
												onClick={this.screenshot}
												className="continue-button"
											>
												Click here if you're done &#10003;
											</button>
										</div>
									) : null}
								</div>
								{/* MUGS */}
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
