import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import LoadPage from "../LoadPage";
import axios from "axios";
import "./style.scss";

const Index = (props) => {
	const [loadingAxiosReq, setLoadingAxiosReq] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [clicks, setClicks] = useState(1);

	const CheckoutForm = () => {
		const stripe = useStripe();
		const elements = useElements();
		const handleSubmitCheckoutForm = async (event) => {
			event.preventDefault();
			setClicks(clicks + 1);
			console.log(clicks);
			if (clicks !== 1) {
				setLoadingAxiosReq(false);
				return setClicks(1);
			}

			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: elements.getElement(CardElement),
				billing_details: { name: props.firstName, email: props.email },
			});
			if (paymentMethod === undefined) {
				return alert("fill out the form with your card information");
			}

			const { id } = paymentMethod;

			if (error) {
				return console.log(error);
			}

			try {
				setLoadingAxiosReq(true);

				const { data } = await axios.post("/products/payment", {
					id,
					amount: props.product,
					email: props.email,
				});

				if (data.requiresAction === true) {
					stripe.confirmCardPayment(data.clientSecret).then(async (result) => {
						if (result.error) {
							alert(result.error.message);
							props.resetModal();
							setErrorMsg("");
							setLoadingAxiosReq(false);
						} else {
							if (result.paymentIntent.status === "succeeded") {
								let imgUrl = [];
								let imgScrSht = [];
								const URL =
									"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload";

								const imgForProductFormData = props.imgForProduct.map((img) => {
									const fd = new FormData();
									fd.append("file", img);
									fd.append("upload_preset", "sublimation");
									return fd;
								});

								const screenShotsFormData = props.screenshot.map((img) => {
									const fd = new FormData();
									fd.append("file", img);
									fd.append("upload_preset", "sublimation");
									return fd;
								});

								const imgForProductRequests = imgForProductFormData.map(
									async (fd) => await axios.post(URL, fd).catch((err) => null)
								);
								const screenshotsRequests = screenShotsFormData.map(
									async (fd) => await axios.post(URL, fd).catch((err) => null)
								);

								try {
									const imgForProductResponses = await axios.all(
										imgForProductRequests
									);
									imgForProductResponses.map((res) => {
										// console.log(res.data.secure_url);
										return res.data.secure_url
											? imgUrl.push(res.data.secure_url)
											: null;
									});

									const screenshotsResponses = await axios.all(
										screenshotsRequests
									);
									screenshotsResponses.map((res) => {
										// console.log(res.data.secure_url);
										return res.data.secure_url
											? imgScrSht.push(res.data.secure_url)
											: null;
									});

									let dataObj = {
										email: props.email,
										img: imgUrl,
										screenshot: imgScrSht,
									};
									// console.log(dataObj);

									new Promise((resolve, reject) => {
										axios.post("/email_to_ayp_sublimation", dataObj);
										resolve((res) => {
											console.log(res);
										});
										reject((err) => {
											console.log(err);
										});
									});
									alert(
										"Your order will be ready soon, check your email for updates"
									);
									window.location.href = "/";
								} catch (err) {
									console.log(err);
								}
							}
						}
					});
				} else {
					let imgUrl = [];
					let imgScrSht = [];
					const URL =
						"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload";

					const imgForProductFormData = props.imgForProduct.map((img) => {
						const fd = new FormData();
						fd.append("file", img);
						fd.append("upload_preset", "sublimation");
						return fd;
					});

					const screenShotsFormData = props.screenshot.map((img) => {
						const fd = new FormData();
						fd.append("file", img);
						fd.append("upload_preset", "sublimation");
						return fd;
					});

					const imgForProductRequests = imgForProductFormData.map(
						async (fd) => await axios.post(URL, fd).catch((err) => null)
					);
					const screenshotsRequests = screenShotsFormData.map(
						async (fd) => await axios.post(URL, fd).catch((err) => null)
					);

					try {
						const imgForProductResponses = await axios.all(
							imgForProductRequests
						);
						imgForProductResponses.map((res) => {
							// console.log(res.data.secure_url);
							return res.data.secure_url
								? imgUrl.push(res.data.secure_url)
								: null;
						});

						const screenshotsResponses = await axios.all(screenshotsRequests);
						screenshotsResponses.map((res) => {
							// console.log(res.data.secure_url);
							return res.data.secure_url
								? imgScrSht.push(res.data.secure_url)
								: null;
						});

						let dataObj = {
							email: props.email,
							img: imgUrl,
							screenshot: imgScrSht,
						};
						// console.log(dataObj);

						new Promise((resolve, reject) => {
							axios.post("/email_to_ayp_sublimation", dataObj);
							resolve((res) => {
								console.log(res);
							});
							reject((err) => {
								console.log(err);
							});
						});
						function announceSuccess() {
							alert("Success...check your email for updates");
							window.location.href = "/";
						}
						setTimeout(announceSuccess, 1000);
					} catch (err) {
						console.log(err);
					}
				}
			} catch (error) {
				// console.log(error.response.data);
				alert(
					error.response.data + "\nTry to check out using a different card"
				);
				props.resetModal();

				return setLoadingAxiosReq(false);
			}
		};

		return (
			<form onSubmit={handleSubmitCheckoutForm}>
				<h3 className="text-center">Total to Pay: ${props.productWithCents}</h3>

				{loadingAxiosReq ? (
					<LoadPage />
				) : (
					<button
						disabled={loadingAxiosReq}
						type="submit"
						className="btns-checkout-stripe "
					>
						Pay now {""}
					</button>
				)}
			</form>
		);
	};

	const stripePromise = loadStripe(
		"pk_test_5Oyk1YnGn6dPTwNAJ5KhOIcN00lcwk3Oqk"
	);

	return (
		<div className="container main-container-billing">
			<Elements stripe={stripePromise}>
				<div className="card-element-wrapper">
					<CardElement />
				</div>
				<CheckoutForm />
				<p
					style={{
						textAlign: "center",
						color: "red",
						marginTop: "10px",
					}}
				>
					{errorMsg}
				</p>
			</Elements>
		</div>
	);
};

export default Index;
