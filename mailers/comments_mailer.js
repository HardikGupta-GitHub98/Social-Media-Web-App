const nodemailer = require("../config/nodemailer");

module.exports.newComment = function (comment) {
	let htmlString = nodemailer.renderTemplate(
		{ comment: comment },
		"comments/newComment.ejs"
	);
	console.log("Inside New Comments Mailer");
	nodemailer.transporter.sendMail(
		{
			from: "hardikgupta80@gmail.com",
			to: comment.user.email,
			subject: "New Comment Published",
			html: htmlString,
		},
		function (err, info) {
			if (err) {
				console.log("Error Inside the Send Mail CallBack", err);
			} else {
				console.log(`Mail Delivered ${info}`);
			}
			return;
		}
	);
};
