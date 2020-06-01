const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const environment = require("./environment");

let transporter = nodemailer.createTransport(environment.smtp);

let renderTemplate = function (data, relativePath) {
	let mailHTML;
	ejs.renderFile(
		path.join(__dirname, "../views/mailers", relativePath),
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
