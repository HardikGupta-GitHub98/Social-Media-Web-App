const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
let transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "hardikgupta90@gmail.com",
		password: "123",
	},
});

let renderTemplate = function (data, relativePath) {
	let mailHTML;
	ejs.renderFile(
		path.join(__dirname, "../views/mailers.ejs", relativePath),
		data,
		function (err, template) {
			if (err) {
				console.log("Error In Rendering Templates", err);
			} else {
				mailHTML = template;
			}
			return;
		}
	);
	return mailHTML;
};

module.exports = {
	transporter: transporter,
	renderTemplate: renderTemplate,
};
