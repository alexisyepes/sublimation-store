const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const dbProduct = require("../models/products");
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
	console.log("Request:", req.body);
	let error;
	let status;
	try {
		const { product, token } = req.body;
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});
		const idempotency_key = uuidv4();
		const charge = await stripe.charges.create(
			{
				amount: product.price,
				currency: "cad",
				customer: customer.id,
				receipt_email: token.email,
				description: `Purchased the ${product.name}, and subscribed`,
			},
			{
				idempotency_key,
			}
		);
		console.log("Charge:", { charge });
		status = "success";
	} catch (error) {
		console.error("Error:", error);
		status = "failure";
	}
	res.json({ error, status });
});

module.exports = router;
