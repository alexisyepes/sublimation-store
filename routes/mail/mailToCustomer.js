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
  totalCosmeticBagsInCart,
  totalFacemaskHolderInCart,
  shippingMethod,
  subTotal,
  tax,
  amount
) => {
  let mugs =
    totalMugsInCart > 0
      ? `<p>Total number of Mugs: ${totalMugsInCart} ($15.99 ea)</p>`
      : `<span></span>`;
  let shirts =
    totalShirtsInCart > 0
      ? `<p>Total number of Shirts: ${totalShirtsInCart} ($19.99 ea)</p>`
      : `<span></span>`;
  let pillows =
    totalPillowsInCart > 0
      ? `<p>Total number of Pillows: ${totalPillowsInCart} ($24.99 ea)</p>`
      : `<span></span>`;
  let petTags =
    totalPetTagBonesInCart > 0
      ? `<p>Total number of Pet Tags: ${totalPetTagBonesInCart} ($12.99 ea)</p>`
      : `<span></span>`;
  let cosmeticBags =
    totalCosmeticBagsInCart > 0
      ? `<p>Total number of Cosmetic Bags: ${totalCosmeticBagsInCart} ($18.99 ea)</p>`
      : `<span></span>`;
  let faceMaskHolders =
    totalFacemaskHolderInCart > 0
      ? `<p>Total number of Wooden Signs: ${totalFacemaskHolderInCart} ($34.99 ea)</p>`
      : `<span></span>`;

  let isShipping =
    shippingMethod === "delivery"
      ? `
		<p>Delivery costs: $15.00
		<br /> <br /> Your order will be delivered to the address provided soon.</p>`
      : shippingMethod === "pickUpMilton"
      ? `<p>Thanks for your purchase! \nYour order will be ready to be picked up from our Milton partner location soon; you will receive another email to notify you when the order is ready. </p>`
      : `<p>Thanks for your purchase! \nYour order will be ready to be picked up from our Cambridge partner location soon; you will receive another email to notify you when the order is ready.</p>`;
  const mailOptions = {
    from: "aypsublimation@gmail.com",
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
    ${cosmeticBags}
    ${faceMaskHolders}
		<p>Subtotal: $${subTotal.toFixed(2)}</p>
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
