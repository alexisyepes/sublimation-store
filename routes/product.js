const express = require("express");
const router = express.Router();
const dbProduct = require("../models/products");

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

module.exports = router;
