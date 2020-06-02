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

const sendMail = (email) => {
	const mailOptions = {
		from: "info@aypwebcreations.com",
		to: email,
		subject: "Your product",
		text:
			"Thanks for your purchase! \nYour order will be ready for pick up soon. \nYou will receive an email shortly confirming your pickup date and time. \n\nwww.aypsublimation.ca",
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
