const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  couponName: { type: String, required: true },
  price: { type: Number, required: true },
});

const Coupon = mongoose.model("Coupon", storeSchema);

module.exports = Coupon;
