const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
});

const CustomizedProduct = mongoose.model("CustomizedProduct", storeSchema);

module.exports = CustomizedProduct;
