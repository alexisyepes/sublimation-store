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
	const mailOptions = {
		from: "info@aypwebcreations.com",
		to: "aypsublimation@gmail.com",
		subject: "New products Sublimation!",
		// text:
		// 	"More products for sublimation" +
		// 	"\n" +
		// 	img +
		// 	"\n For customer: " +
		// 	email,
		html: `<html><p>More products for sublimation 
			\n
			<img width="600px" height="600px" src=${img} alt="image 1"/> 
      "\n For customer: ${email}</p> \n
      <img width="600px" height="600px" src="${screenshot}" alt="image 2"/> </html>`,
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
