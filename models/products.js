const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
	productName: { type: String, required: true },
	price: { type: Number, required: true },
	customerName: { type: String, required: true },
	email: { type: String, required: true },
	purchaseDate: { type: String, required: true },
});

const Sublimation = mongoose.model("Sublimation", storeSchema);

module.exports = Sublimation;
