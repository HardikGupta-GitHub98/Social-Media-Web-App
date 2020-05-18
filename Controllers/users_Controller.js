const User = require("../models/user.js");

module.exports.profile = function (req, res) {
	const id = req.cookies.user_id;
	User.findById(id, function (err, user) {
		if (err) {
			console.log(`Error In Finding The User ${err}`);
		} else {
			res.render("user_profile", {
				title: `Verified User`,
				name: user.name,
				email: user.email,
				password: user.password,
			});
		}
	});
	// return res.end("<h1>User Profile</h1>");
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
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			// If there is Some Error in Looking for the Email in the DB
			console.log(`Error In Looking For The Email ${err}`);
			res.redirect("back");
		} else if (user) {
			// If the Entered Password Does'nt match the one in DB for the entered email
			if (user.password != req.body.password) {
				console.log(`Entered Password Is Incorrect!!!`);
				res.redirect("back");
			} else {
				// If the password Matches then the user is redirected to Profile PAge
				res.cookie("user_id", user.id);
				console.log(user._id);
				// res.render("user_profile", {
				// 	title: "Signed In User",
				// 	name: user.name,
				// 	email: req.body.email,
				// 	password: user.password,
				// });
				res.redirect("/users/profile");
			}
		} else {
			// if the User{Email} is Not Found IN DB
			console.log(`Entered Email ${req.body.email}// Not Found In DB`);
			res.redirect("back");
		}
		return;
	});
};
// module.exports.createSession = function (req, res) {
// 	return res.redirect("/users/profile");
// };
