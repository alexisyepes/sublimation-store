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

	const CheckoutForm = () => {
		console.log(props.imgForProduct);
		const stripe = useStripe();
		const elements = useElements();
		const handleSubmitCheckoutForm = async (event) => {
			event.preventDefault();
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: elements.getElement(CardElement),
				billing_details: { name: props.firstName, email: props.email },
			});

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
						// console.log(result.paymentIntent);
						if (result.error) {
							alert(result.error.message);
							setLoadingAxiosReq(false);
							// return window.location.reload();
						} else {
							if (result.paymentIntent.status === "succeeded") {
								const fd = new FormData();
								fd.append("file", props.imgForProduct);
								fd.append("upload_preset", "sublimation");
								axios
									.post(
										"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
										fd
									)
									.then(async (res) => {
										const email = props.email;
										const img = res.data.secure_url;
										const fd2 = new FormData();
										fd2.append("file", props.screenshot);
										fd2.append("upload_preset", "sublimation");

										await axios
											.post(
												"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
												fd2
											)
											.then(async (res) => {
												let screenshot = res.data.secure_url;
												let data = {
													email,
													img,
													screenshot,
												};

												await axios
													.post("/email_to_ayp_sublimation", data)
													.then(() => {
														// setLoadingAxiosReq(false);
														alert(
															"Payment successfully made! Check email for details"
														);
														// return window.location.reload();
													})
													.catch((err) => console.log(err));
											})
											.catch((err) => console.log(err));
									})
									.catch((err) => console.log(err));
							}
						}
					});
				} else {
					let imgUrl = [];
					let imgScrSht = [];

					axios
						.all([
							props.imgForProduct.map((img) => {
								const fd = new FormData();
								fd.append("file", img);
								fd.append("upload_preset", "sublimation");
								return axios
									.post(
										"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
										fd
									)
									.then(async (res) => {
										await imgUrl.push(res.data.secure_url);
										console.log(imgScrSht);
									})
									.catch((err) => console.log(err));
							}),

							props.screenshot.map((img) => {
								const fd = new FormData();
								fd.append("file", img);
								fd.append("upload_preset", "sublimation");
								return axios
									.post(
										"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
										fd
									)
									.then(async (res) => {
										await imgScrSht.push(res.data.secure_url);
										console.log(imgScrSht);
									})
									.catch((err) => console.log(err));
							}),
						])
						.then(
							axios.spread(async (...res) => {
								res.map((data) => console.log(data[0]));

								// function delay(ms) {
								// 	return new Promise((resolve) => setTimeout(resolve, ms));
								// }

								// delay(4000).then(() => {
								// 	console.log(imgUrl);
								// 	console.log(imgScrSht);
								// });
							})
						)
						// .then(async (resArr) => {
						// 	console.log(resArr);
						// 	let data = {
						// 		email: props.email,
						// 		img: imgUrl,
						// 		screenshot: imgScrSht,
						// 	};

						// 	await axios
						// 		.post("/email_to_ayp_sublimation", data)
						// 		.then(() => {
						// 			// setLoadingAxiosReq(false);
						// 			alert("Payment successfully made! Check email for details");
						// 			// return window.location.reload();
						// 		})
						// 		.catch((err) => console.log(err));
						// 	// console.log(resArr);
						// })
						.catch((err) => console.error(err));
				}

				// window.location.href = "/";
			} catch (error) {
				console.log(error);
				setErrorMsg(error);
				setLoadingAxiosReq(false);
			}
		};

		return (
			<form onSubmit={handleSubmitCheckoutForm}>
				<h3 className="text-center">Total to Pay: ${props.productWithCents}</h3>
				<div className="card-element-wrapper">
					<CardElement />
				</div>
				{loadingAxiosReq ? (
					<LoadPage />
				) : (
					<button type="submit" className="btns-checkout-stripe ">
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

// let res_promises = props.imgForProduct.map(
// 	(file) =>
// 		new Promise((resolve, reject) => {
// 			const fd = new FormData();
// 			fd.append("file", file);
// 			fd.append("upload_preset", "sublimation");
// 			axios
// 				.post(
// 					"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
// 					fd
// 				)
// 				.then((res) => console.log(res))
// 				.catch((err) => console.error(err));
// 		})
// );

// const fd = new FormData();
// fd.append("file", props.imgForProduct);
// fd.append("upload_preset", "sublimation");
// axios
// 	.post(
// 		"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
// 		fd
// 	)
// 	.then(async (res) => {
// 		const email = props.email;
// 		const img = res.data.secure_url;
// 		const fd2 = new FormData();
// 		fd2.append("file", props.screenshot);
// 		fd2.append("upload_preset", "sublimation");

// 		await axios
// 			.post(
// 				"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
// 				fd2
// 			)
// 			.then(async (res) => {
// 				let screenshot = res.data.secure_url;
// 				let data = {
// 					email,
// 					img,
// 					screenshot,
// 				};

// 				await axios
// 					.post("/email_to_ayp_sublimation", data)
// 					.then(() => {
// 						// setLoadingAxiosReq(false);
// 						alert(
// 							"Payment successfully made! Check email for details"
// 						);
// 						return window.location.reload();
// 					})
// 					.catch((err) => console.log(err));
// 			})
// 			.catch((err) => console.log(err));
// 	})
// 	.catch((err) => console.log(err));
