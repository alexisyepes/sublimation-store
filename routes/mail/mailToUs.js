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

const sendMailToUs = (email, img, screenshot) => {
	let imgArr = img.map((image) => {
		// return image;
		return `<p>"${image}" <p/> <br/>
    <img src="${image}" alt="Img Product" width="200" height="300">`;
	});

	console.log(imgArr);

	let ImgScrShtArr = screenshot.map((scrSht) => {
		// return scrSht;
		return `<p>"${scrSht}" <p/> <br/>
    <img src="${scrSht}" alt="Img Product" width="300" height="150">`;
	});

	console.log(ImgScrShtArr);
	const mailOptions = {
		from: "info@aypwebcreations.com",
		to: "aypsublimation@gmail.com",
		subject: "New order Sublimation!",

		html: `<html><h4>You've got products for sublimation: </h4>
    <p>For customer: ${email}</p>
    <p>  Main Photos: </p>
      ${imgArr}
    <p>Screenshots of product designed: </p>
      ${ImgScrShtArr}
       </html>`,
	};

	transporter.sendMail(mailOptions, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
};

module.exports = sendMailToUs;