import React, { Component } from "react";
import Select from "react-select";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import Modal from "react-modal";
// import axios from "axios";
import CheckoutStripe from "../../components/StripeForm";
import Mugs from "../../components/Mugs";
import Shirts from "../../components/Shirt";
import Pillow from "../../components/Pillow";

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

let sizeShirtsOptions = [
	{
		value: "xm",
		label: "XS",
	},
	{
		value: "sm",
		label: "S",
	},
	{
		value: "m",
		label: "M",
	},
	{
		value: "l",
		label: "L",
	},
	{
		value: "xl",
		label: "XL",
	},
	{
		value: "xx",
		label: "XX",
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
		backgroundColor: "rgb(192,192,192)",
		color: "black",
		borderRadius: "5px",
		width: "600px",
		overflow: "visible",
		border: "1px solid black",
		boxShadow: "0px 60px 150px black",
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
	overlay: { zIndex: 10000 },
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
			price: 1800,
		},
		Pillow: {
			name: "pillow",
			price: 2200,
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
				"./images/shirt.png",
				"./images/pillow.png",
				"https://images-na.ssl-images-amazon.com/images/I/61zYvzxjdHL._AC_SL1500_.jpg",
				"https://5.imimg.com/data5/PD/DM/MY-13899650/blank-white-square-keychain-rings-for-sublimation-500x500.jpg",
			],
			productImg: "",
			productImgBack: "",
			productImgShirt: "",
			productImgPillow: "",
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
			totalMugsInCart: 0,
			totalShirtsInCart: 0,
			totalPillowsInCart: 0,
			totalKeychainsInCart: 0,
			firstName: "",
			email: "",
			billingDetails: false,
			checkOutStripe: false,
			showMsgInput: false,
			qty: 1,
			step2ActualProd: "",
			designSquare: true,
			shirtSize: "",
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
			productImgShirt: "",
			step2ActualProd: "mug",
			step2: true,
		});
	};

	handleShirtImg = async () => {
		await this.setState({
			step2ActualProd: "shirt",
			productImgShirt: this.state.productImgArray[1],
			productImg: "",
			step2: true,
		});
		// console.log(this.state.productImgShirt);
	};

	handlePillowcaseImg = async () => {
		await this.setState({
			step2ActualProd: "pillow",
			productImgPillow: this.state.productImgArray[2],
			productImg: "",
			step2: true,
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
			designSquare: false,
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

	clearPhoto = () => {
		this.setState({
			imagePreviewUrl: "",
		});
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
				modalToCheckout: false,
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
				totalMugsInCart: 0,
				totalShirtsInCart: 0,
				totalPillowsInCart: 0,
				totalKeychainsInCart: 0,
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

	onSelectedChangeSize = async (value) => {
		await this.setState({
			shirtSize: value.value,
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

	screenshotMugs = async () => {
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
					totalMugsInCart: this.state.totalMugsInCart + this.state.qty,
				});
			}
		);
	};

	screenshotShirts = async () => {
		if (this.state.notChecked === true) {
			return this.setState({
				errorMsg: "Confirm before continuing",
			});
		}
		if (this.state.shirtSize === "") {
			return alert("Oops! you forgot to select size");
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

				await this.setState({
					fileArray: [...this.state.fileArray, this.state.file],
					screenshot: [...this.state.screenshot, savable.src],
					toggleStep3: true,
					toggleStep2: false,
					textFormatOptions: false,
					productToPay: this.state.productToPay.concat(
						product[0].Shirt.price * this.state.qty
					),
					cart: this.state.cart + this.state.qty,
					totalShirtsInCart: this.state.totalShirtsInCart + this.state.qty,
				});
				await console.log(this.state.fileArray);
			}
		);
	};

	screenshotPillow = async () => {
		if (this.state.notChecked === true) {
			return this.setState({
				errorMsg: "Confirm before continuing",
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

				await this.setState({
					fileArray: [...this.state.fileArray, this.state.file],
					screenshot: [...this.state.screenshot, savable.src],
					toggleStep3: true,
					toggleStep2: false,
					textFormatOptions: false,
					productToPay: this.state.productToPay.concat(
						product[0].Pillow.price * this.state.qty
					),
					cart: this.state.cart + this.state.qty,
					totalPillowsInCart: this.state.totalPillowsInCart + this.state.qty,
				});
				await console.log(this.state.fileArray);
			}
		);
	};

	goBackToStep2 = async () => {
		if (
			window.confirm(
				`If you continue, your progress will be lost and you will need to re-create this product and its quantities. \nDo you still want to procceed?`
			)
		) {
			if (this.state.step2ActualProd === "mug") {
				await this.setState({
					toggleStep3: false,
					toggleStep2: true,
					textFormatOptions: true,
					notChecked: true,
					cart: this.state.cart - this.state.qty,
					// qty: 1,
					totalMugsInCart: this.state.totalMugsInCart - this.state.qty,
					// totalShirtsInCart: this.state.totalShirtsInCart - this.state.qty,
					productToPay: this.state.productToPay.slice(0, -1),
					fileArray: this.state.fileArray.slice(0, -1),
					screenshot: this.state.screenshot.slice(0, -1),
					imagePreviewUrl: "",
					file: "",
				});
			}
			if (this.state.step2ActualProd === "shirt") {
				await this.setState({
					toggleStep3: false,
					toggleStep2: true,
					textFormatOptions: true,
					notChecked: true,
					cart: this.state.cart - this.state.qty,
					// qty: 1,
					// totalMugsInCart: this.state.totalMugsInCart - this.state.qty,
					totalShirtsInCart: this.state.totalShirtsInCart - this.state.qty,
					productToPay: this.state.productToPay.slice(0, -1),
					fileArray: this.state.fileArray.slice(0, -1),
					screenshot: this.state.screenshot.slice(0, -1),
					imagePreviewUrl: "",
					file: "",
				});
			}
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
	};

	toggleDesignSquare = async () => {
		this.setState((prevState) => ({
			designSquare: !prevState.designSquare,
		}));
	};

	render() {
		return (
			<div className="product-creation-container">
				<h1 className="home__heading text-center">
					Create your product in 3 easy steps{" "}
				</h1>
				{!this.state.modalToCheckout ? (
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
								<h2 className="product-select" onClick={this.handleShirtImg}>
									Shirt
								</h2>
								<h2
									className="product-select"
									onClick={this.handlePillowcaseImg}
								>
									Pillowcase (16"X16")
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
									{this.state.totalMugsInCart > 0 ? (
										<div>
											<p>
												Total Mugs in Cart: {this.state.totalMugsInCart}{" "}
												<span>
													(Mug: ${product[0].Mug.price * 0.01}
													.00)
												</span>
											</p>
										</div>
									) : null}
									{this.state.totalShirtsInCart > 0 ? (
										<div>
											<p>
												Total Shirts in Cart: {this.state.totalShirtsInCart}{" "}
												{""}
												<span>
													(Shirt: ${product[0].Shirt.price * 0.01}.00 )
												</span>
											</p>
										</div>
									) : null}
									{this.state.totalPillowsInCart > 0 ? (
										<div>
											<p>
												Total Pillows in Cart: {this.state.totalPillowsInCart}{" "}
												{""}
												<span>
													(Pillow: ${product[0].Pillow.price * 0.01}.00 )
												</span>
											</p>
										</div>
									) : null}
									<p>
										Sub-Total: $
										{product[0].Mug.price * 0.01 * this.state.totalMugsInCart +
											product[0].Shirt.price *
												0.01 *
												this.state.totalShirtsInCart +
											product[0].Pillow.price *
												0.01 *
												this.state.totalPillowsInCart}
										.00
									</p>
									<p>
										Total Tax: $
										{(
											0.13 * this.state.mugPrice * this.state.totalMugsInCart +
											product[0].Shirt.price *
												this.state.totalShirtsInCart *
												0.01 *
												0.13 +
											product[0].Pillow.price *
												this.state.totalPillowsInCart *
												0.01 *
												0.13
										).toFixed(2)}
									</p>
									<hr />
									<p>
										Total to Pay: $
										{this.state.productToPay.length > 0
											? this.state.productToPay.reduce((a, b) => a + b) * 0.01 +
											  this.state.productToPay.reduce((a, b) => a + b) *
													0.01 *
													0.13
											: 0}{" "}
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
											Modify the Last product added {""}
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
						<h1 className="product-main-title">MY PRODUCT</h1>
						{this.state.step2 ? (
							<div>
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
												onClick={this.resetForNewProduct}
												className="startOver-button"
											>
												&#8634; Back to Step 1
											</button>
										</div>
									)}

									{this.state.step2ActualProd === "mug" ? (
										<Mugs
											productImg={this.state.productImg}
											productImgBack={this.state.productImgBack}
											imagePreviewUrl={this.state.imagePreviewUrl}
											bg={this.state.bg}
											textOnMugs={this.state.textOnMugs}
											textFormatOptions={this.state.textFormatOptions}
										/>
									) : null}
									{this.state.step2ActualProd === "shirt" ? (
										<Shirts
											showGuide={this.state.designSquare}
											toggleDesignSquare={this.toggleDesignSquare}
											img={this.state.productImgShirt}
											imagePreviewUrl={this.state.imagePreviewUrl}
											textOnMugs={this.state.textOnMugs}
											textFormatOptions={this.state.textFormatOptions}
										/>
									) : null}
									{this.state.step2ActualProd === "pillow" ? (
										<Pillow
											showGuide={this.state.designSquare}
											toggleDesignSquare={this.toggleDesignSquare}
											img={this.state.productImgPillow}
											imagePreviewUrl={this.state.imagePreviewUrl}
											textOnMugs={this.state.textOnMugs}
											textFormatOptions={this.state.textFormatOptions}
										/>
									) : null}
								</div>
							</div>
						) : (
							<div className="arrowToLeft">
								<h1 className="text-center">&#x21da; Begin with step 1</h1>
							</div>
						)}

						{this.state.toggleStep2 ? (
							<div className="step-2-container">
								{/* CONTROLS TO ADD CONTENT ON MUGS */}
								<div className="  controls-to-add-content-to-mugs">
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
										{this.state.step2ActualProd === "shirt" ? (
											<div className="shirt-size-select">
												<Select
													menuPlacement="top"
													placeholder="size"
													onChange={this.onSelectedChangeSize}
													options={sizeShirtsOptions}
												/>
											</div>
										) : null}
									</div>
									<div className="upload-photo-parent">
										<h2
											onClick={() => {
												this.fileInput.click();
											}}
											className="heading-product heading-product__upload text-center"
										>
											&#x2912; CLICK TO UPLOAD PHOTO
										</h2>
										<button
											onClick={this.clearPhoto}
											className="clear-photo-btn"
										>
											&#128465; Clear Photo
										</button>
									</div>
									{this.state.step2ActualProd === "mug" ? (
										<Select
											className="background-select"
											menuPlacement="top"
											placeholder="Choose background (optional)"
											options={optionsBackgrounds}
											onChange={this.onSelectedChange}
										/>
									) : null}
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

											{/* CONFIRM ORDER FOR MUGS */}
											{this.state.step2ActualProd === "mug" ? (
												<button
													onClick={this.screenshotMugs}
													className="continue-button"
												>
													Click here if you're done &#10003;
												</button>
											) : null}

											{/* CONFIRM ORDER FOR SHIRTS */}
											{this.state.step2ActualProd === "shirt" ? (
												<button
													onClick={this.screenshotShirts}
													className="continue-button"
												>
													Click here if you're done &#10003;
												</button>
											) : null}

											{/* CONFIRM ORDER FOR PILLOWS */}
											{this.state.step2ActualProd === "pillow" ? (
												<button
													onClick={this.screenshotPillow}
													className="continue-button"
												>
													Click here if you're done &#10003;
												</button>
											) : null}
										</div>
									) : null}
								</div>
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
								<div className="text-center">
									<button
										onClick={this.updateComponent}
										className="empty-cart-button__checkout"
									>
										<i className="fas fa-trash"></i> Cancel and empty cart
									</button>
									{this.state.totalMugsInCart > 0 ? (
										<div>
											<p>
												Total Mugs in Cart: {this.state.totalMugsInCart}{" "}
												<span>
													(Mug: ${product[0].Mug.price * 0.01}
													.00)
												</span>
											</p>
										</div>
									) : null}
									{this.state.totalShirtsInCart > 0 ? (
										<div>
											<p>
												Total Shirts in Cart: {this.state.totalShirtsInCart}{" "}
												{""}
												<span>
													(Shirt: ${product[0].Shirt.price * 0.01}.00 )
												</span>
											</p>
										</div>
									) : null}
									{this.state.totalPillowsInCart > 0 ? (
										<div>
											<p>
												Total Shirts in Cart: {this.state.totalPillowsInCart}{" "}
												{""}
												<span>
													(Shirt: ${product[0].Pillow.price * 0.01}.00 )
												</span>
											</p>
										</div>
									) : null}
									<p>
										Sub-Total: $
										{product[0].Mug.price * 0.01 * this.state.totalMugsInCart +
											product[0].Shirt.price *
												0.01 *
												this.state.totalShirtsInCart +
											product[0].Pillow.price *
												0.01 *
												this.state.totalPillowsInCart}
										.00
									</p>
									<p>
										Total Tax: $
										{(
											0.13 * this.state.mugPrice * this.state.totalMugsInCart +
											product[0].Shirt.price *
												this.state.totalShirtsInCart *
												0.01 *
												0.13 +
											product[0].Pillow.price *
												this.state.totalPillowsInCart *
												0.01 *
												0.13
										).toFixed(2)}
									</p>
									<hr />
									<p>
										Total to Pay: $
										{this.state.productToPay.length > 0
											? this.state.productToPay.reduce((a, b) => a + b) * 0.01 +
											  this.state.productToPay.reduce((a, b) => a + b) *
													0.01 *
													0.13
											: 0}{" "}
										<span aria-label="0" role="img">
											&#128722;
										</span>
									</p>
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
										<p className="text-center error-msg">
											{this.state.errorMsg}
										</p>
									</form>
								</div>
							) : null}

							{this.state.billingDetails ? (
								<CheckoutStripe
									resetModal={this.closeModalCheckout}
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
