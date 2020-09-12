const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const mailGunKeys = require("../../config/keys");
const MGapiKey = mailGunKeys.MAILGUN_API_KEY;
const MGdomain = mailGunKeys.DOMAIN;

const auth = {
  auth: {
    api_key: MGapiKey, //change to Live API key and domain
    domain: MGdomain,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, shippingMethod, amount, orderSummary, coupon, tax) => {
  let isThereCoupon =
    coupon !== 0 ? `<p>Coupon Provided: ${coupon}% off</p>` : `<span></span>`;

  let isShipping =
    shippingMethod === "delivery"
      ? `
		<p>Shipping: $15.00
		<br /> <br /> Your order will be delivered to the address provided soon.</p>`
      : shippingMethod === "pickUpMilton"
      ? `<p>Thanks for your purchase! \nYour order will be ready to be picked up from our Milton partner location soon; you will receive another email to notify you when the order is ready. </p>`
      : `<p>Thanks for your purchase! \nYour order will be ready to be picked up from our Cambridge partner location soon; you will receive another email to notify you when the order is ready.</p>`;

  let cartSummary = orderSummary.map((item) => {
    // return image;
    return `<p>Item Name: ${item.productName}</p>
              <p>Qty: ${item.qty}</p>
              <p>Price: $${item.price / 100}</p>
              <hr />`;
  });

  const mailOptions = {
    from: "aypsublimation@gmail.com",
    to: email,
    subject: "Your product",
    html: `
		<div style="border:1px solid black; padding:10px">
		<h2>Thanks for your purchase!</h2> 
     <h4>Order Summary</h4>
		${cartSummary}
    ${isThereCoupon}
    <h4>Tax: $${(tax / 100).toFixed(2)}</h4>
		${isShipping}
    <h4>Total Paid: $${amount / 100}</h4>
		<hr />
		<hr />
		<p>https://www.printingmemories.ca</p>
		<div>
		<br />
		 <img src="https://res.cloudinary.com/ayp-sublimation/image/upload/v1592330614/logo_snfas3.png" width="50px" alt="logo printing memories"/>
		 </div>
		</div>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

module.exports = sendMail;
