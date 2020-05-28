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

	useEffect(() => {}, []);

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
					stripe.confirmCardPayment(data.clientSecret).then((result) => {
						console.log(result.paymentIntent);
						if (result.error) {
							alert(result.error.message);
							setLoadingAxiosReq(false);
							// return window.location.reload();
						} else {
							if (result.paymentIntent.status === "succeeded") {
								setLoadingAxiosReq(false);
								alert("Payment successfully made! Check email for details");
								return window.location.reload();
							}
						}
					});
				} else {
					setLoadingAxiosReq(false);
					alert("Payment successfully made! Check email for details");
					return window.location.reload();
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
