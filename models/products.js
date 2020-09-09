const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  measurements: { type: String, required: false },
  images: [{ type: String, required: false }],

  size: { type: String, required: false },
  price: { type: Number, required: true },
});

const Sublimation = mongoose.model("Sublimation", storeSchema);

module.exports = Sublimation;
