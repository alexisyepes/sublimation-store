import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		// console.log(props.screenshot);
	}, []);

	const CheckoutForm = () => {
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
					img: "Test image",
				});

				if (data.requiresAction === true) {
					stripe.confirmCardPayment(data.clientSecret).then(async (result) => {
						console.log(result.paymentIntent);
						if (result.error) {
							alert(result.error.message);
							setLoadingAxiosReq(false);
							// return window.location.reload();
						} else {
							if (result.paymentIntent.status === "succeeded") {
								const fd = new FormData();
								fd.append("file", props.imgForProduct);
								fd.append("upload_preset", "sublimation");
								await axios
									.post(
										"https://api.cloudinary.com/v1_1/ayp-sublimation/image/upload",
										fd
									)
									.then(async (res) => {
										let data = {
											email: props.email,
											img: res.data.secure_url,
											screenshot: props.screenshot,
										};
										// console.log(data.screenshot);
										await axios
											.post("/email_to_ayp_sublimation", data)
											.then(() => {
												// console.log(res);
												// setLoadingAxiosReq(false);
												alert(
													"Payment successfully made! Check email for details"
												);
												// return window.location.reload();
											})
											.catch((err) => console.log(err));
									})
									.catch((err) => console.log(err));
							}
						}
					});
				} else {
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
											return window.location.reload();
										})
										.catch((err) => console.log(err));
								})
								.catch((err) => console.log(err));
						})
						.catch((err) => console.log(err));
				}

				// window.location.href = "/";
			} catch (error) {
				console.log(error.response.data.message);
				setErrorMsg(error.response.data.message);
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
