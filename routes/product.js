const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const dbProduct = require("../models/products");
const stripe = require("stripe")(keys.stripeSecretKey);
const { v4: uuidv4 } = require("uuid");
const EmailToAYP = require("./mail/mailToUs");
const EmailToCustomer = require("./mail/mailToCustomer");
const sendMailToAYP = require("./mail/mailMessage");

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

router.post("/contact", (req, res) => {
  const { email, message } = req.body;
  sendMailToAYP(email, message, "Inquiry Product Sublimation", function (
    err,
    data
  ) {
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

router.post("/email_to_ayp_sublimation", (req, res) => {
  const {
    email,
    img,
    screenshot,
    address,
    city,
    province,
    postalCode,
    shippingMethod,
  } = req.body;

  console.log(req.body);

  EmailToAYP(
    email,
    img,
    screenshot,
    address,
    city,
    province,
    postalCode,
    shippingMethod,
    "New Product Sublimation",
    function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error!" });
      } else {
        res.json({ message: "Email Sent!" });
      }
    }
  );
  res.json({
    message: "Done",
  });
});

router.post("/products/payment", async (req, res) => {
  const {
    id,
    amount,
    email,
    totalMugsInCart,
    totalShirtsInCart,
    totalPillowsInCart,
    totalPetTagBonesInCart,
    totalCosmeticBagsInCart,
    shippingMethod,
    subTotal,
    tax,
  } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "CAD",
      description: "Product Sublimation",
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
      EmailToCustomer(
        email,
        totalMugsInCart,
        totalShirtsInCart,
        totalPillowsInCart,
        totalPetTagBonesInCart,
        totalCosmeticBagsInCart,
        shippingMethod,
        subTotal,
        tax,
        amount,
        "Product Confirmation",
        function (err, data) {
          if (err) {
            res.status(500).json({ message: "Internal Error!" });
          } else {
            res.json({ message: "Email Sent!" });
          }
        }
      );

      return res.status(200).json({
        confirm: "Payment successfully submitted! Check your email for details",
      });
    }
  } catch (error) {
    console.log(error.message);
    if (error.statusCode === 402) {
      res.status(402).send(error.message);
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

module.exports = router;
