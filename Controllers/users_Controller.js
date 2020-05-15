const User = require("../models/user.js");

module.exports.profile = function (req, res) {
	return res.end("<h1>User Profile</h1>");
};

module.exports.user_sign_in = function (req, res) {
	res.render("user_sign_in", {
		title: "User Sign In",
	});
};

module.exports.user_sign_up = function (req, res) {
	res.render("user_sign_up", {
		title: "User Sign Up",
	});
};
module.exports.create = function (req, res) {
	if (req.body.password != req.body.confirm_password) {
		console.log(`Passwords Do Not Match`);

		return res.redirect("back");
	}
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			return console.log("Error In Searching For the entered Email", err);
		} else if (user) {
			return res.redirect("back");
		}
	});
	User.create(req.body, function (err, user) {
		if (err) {
			console.log(`error in creating new user ${err}`);
		} else {
			console.log(`${user} Successfully Created `);
			res.redirect("/users/user-sign-in");
		}
		return;
	});
};
module.exports.createSession = function (req, res) {
	return;
};
