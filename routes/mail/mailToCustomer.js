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

const sendMail = (
  email,
  totalMugsInCart,
  totalShirtsInCart,
  totalPillowsInCart,
  totalPetTagBonesInCart,
  shipped,
  subTotal,
  tax,
  amount
) => {
  let mugs =
    totalMugsInCart > 0
      ? `<p>Total number of Mugs: ${totalMugsInCart} </p>`
      : `<span></span>`;
  let shirts =
    totalShirtsInCart > 0
      ? `<p>Total number of Shirts: ${totalShirtsInCart} </p>`
      : `<span></span>`;
  let pillows =
    totalPillowsInCart > 0
      ? `<p>Total number of Pillows: ${totalPillowsInCart} </p>`
      : `<span></span>`;
  let petTags =
    totalPetTagBonesInCart > 0
      ? `<p>Total number of Pet Tags: ${totalPetTagBonesInCart} </p>`
      : `<span></span>`;

  let isShipping = shipped
    ? `
		<p>Delivery costs: $15.00
		<br /> Your order will be delivered to the address provided soon. </p>`
    : `<p>Thanks for your purchase! \nYour order will be ready to pickup soon.</p>`;
  const mailOptions = {
    from: "info@aypwebcreations.com",
    to: email,
    subject: "Your product",
    html: `
		<div style="border:1px solid black; padding:10px">
		<h2>Thanks for your purchase!</h2> 
		<h3>Order Summary: </h3>  
		${mugs} 
		${shirts} 
		${pillows} 
		${petTags} 
		<p>Subtotal: $${subTotal}</p>
		<p>hst: $${tax}</p>
		${isShipping}
		<hr />
		<p><b>Total paid: $${(amount * 0.01).toFixed(2)}</b></p>
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
