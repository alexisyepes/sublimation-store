const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const dbProduct = require("../models/products");
const Stripe = require("stripe");
const stripe = require("stripe")(keys.stripeSecretKey);
const { v4: uuidv4 } = require("uuid");

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

router.post("/products/payment", async (req, res) => {
	const { id, amount } = req.body;
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "CAD",
			description: "Mug Sublimation",
			payment_method: id,
			confirm: true,
		});

		console.log(payment);

		return res.status(200).json({
			confirm: "Payment successfully submitted! Check your email for details",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({
			message: error.message,
		});
	}
});

module.exports = router;
