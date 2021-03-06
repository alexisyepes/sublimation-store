const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const dbCoupon = require("../models/coupons");
const dbProduct = require("../models/products");
const dbCustomizedProduct = require("../models/productsCustomized");
const stripe = require("stripe")(keys.stripeSecretKey);
const { v4: uuidv4 } = require("uuid");
const EmailToAYP = require("./mail/mailToUs");
const EmailToCustomer = require("./mail/mailToCustomer");
const sendMailToAYP = require("./mail/mailMessage");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//add coupon
router.post("/coupon", (req, res) => {
  let coupon = {
    couponName: req.body.couponName,
    price: req.body.price,
  };
  dbCoupon
    .create(coupon)
    .then(() => res.send(coupon))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//all coupons
router.get("/all_coupons", (req, res) => {
  dbCoupon
    .find()
    .then((coupon) => res.json(coupon))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//all products
router.get("/all_products", (req, res) => {
  dbProduct
    .find()
    .then((product) => res.json(product))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/product/:id", function (req, res) {
  dbProduct.findOne(
    {
      _id: req.params.id,
    },
    function (error, found) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(found);
        res.send(found);
      }
    }
  );
});

router.post("/product", (req, res) => {
  let product = {
    ...req.body,
  };
  dbProduct
    .create(product)
    .then(() => res.send(product))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//all products Customized
router.get("/all_products_customized", (req, res) => {
  dbCustomizedProduct
    .find()
    .then((product) => res.json(product))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/customized_product", (req, res) => {
  let product = {
    ...req.body,
  };
  dbCustomizedProduct
    .create(product)
    .then(() => res.send(product))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/customized_product/:id", function (req, res) {
  dbCustomizedProduct.findOne(
    {
      _id: req.params.id,
    },
    function (error, found) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(found);
        res.send(found);
      }
    }
  );
});

router.post("/contact", (req, res) => {
  const { email, message } = req.body;
  sendMailToAYP(email, message, "Inquiry Product Sublimation", function (
    err,
    data
  ) {
    if (err) {
      console.log(err);
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
    address,
    city,
    province,
    postalCode,
    shippingMethod,
    couponName,
    orderSummary,
  } = req.body;

  // console.log(req.body);

  EmailToAYP(
    email,
    address,
    city,
    province,
    postalCode,
    shippingMethod,
    couponName,
    orderSummary,
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
    shippingMethod,
    orderSummary,
    coupon,
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

    // console.log(req.body);

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
        shippingMethod,
        amount,
        orderSummary,
        coupon,
        tax,
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
