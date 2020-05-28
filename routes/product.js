const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const dbProduct = require("../models/products");
const stripe = require("stripe")(keys.stripeSecretKey);
const { v4: uuidv4 } = require("uuid");
const EmailToAYP = require("./mail/mailToUs");
const EmailToCustomer = require("./mail/mailToCustomer");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

router.post("/product", (req, res) => {
	let product = {
		productName: req.body.productName,
		price: req.body.price,
		customerName: req.body.customerName,
		email: req.body.email,
		purchaseDate: req.body.purchaseDate,
	};
	dbProduct
		.create(product)
		.then(() => res.send(product))
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

router.post("/email_to_ayp_sublimation", (req, res) => {
	const { email, img } = req.body;

	EmailToAYP(email, img, "New Product Sublimation", function (err, data) {
		if (err) {
			res.status(500).json({ message: "Internal Error!" });
		} else {
			res.json({ message: "Email Sent!" });
		}
	});
	res.json({
		message: "Done",
	});
});

router.post("/products/payment", async (req, res) => {
	const { id, amount, email, img } = req.body;
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "CAD",
			description: "Mug Sublimation",
			payment_method: id,
			confirm: true,
		});

		console.log(payment.status);
		if (payment.status === "requires_action") {
			return res.send({
				requiresAction: true,
				clientSecret: payment.client_secret,
			});
		}
		if (payment.status === "succeeded") {
			EmailToCustomer(email, "Product Confirmation", function (err, data) {
				if (err) {
					res.status(500).json({ message: "Internal Error!" });
				} else {
					res.json({ message: "Email Sent!" });
				}
			});

			return res.status(200).json({
				confirm: "Payment successfully submitted! Check your email for details",
			});
		}
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({
			message: error.message,
		});
	}
});

module.exports = router;
