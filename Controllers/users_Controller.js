const User = require("../models/user.js");

module.exports.profile = function (req, res) {
	User.findById(req.params.id, function (err, user) {
		return res.render("user_profile", {
			title: "Profile Page",
			porfile_user: user,
		});
	});
};
module.exports.updateDetails = function (req, res) {
	if (req.user.id == req.params.id) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
			if (err) {
				console.log(`Error In FInd User To Update ${err}`);
			} else if (!user) {
				// res.status(200).send("Updated Successfully");
				console.log(`User Not Found`);
			} else {
				console.log(`Profile Updated SuccessFully`);
			}
		});
	} else {
		res.status(401).send("Unauthorised");
	}
	res.redirect("/");
	return;
};

module.exports.user_sign_in = function (req, res) {
	if (req.isAuthenticated()) {
		res.redirect("/users/profile");
	} else {
		res.render("user_sign_in", {
			title: "User Sign In",
		});
	}
	return;
};

module.exports.user_sign_up = function (req, res) {
	if (req.isAuthenticated()) {
		res.redirect("/users/profile");
	} else {
		res.render("user_sign_up", {
			title: "User Sign Up",
		});
	}
	return;
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

// Cerating a Session For the user When Signed In
module.exports.createSession = function (req, res) {
	req.flash("success", "Signed In Successfully");
	return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
	req.logout();
	req.flash("success", "Signed Out Successfully");
	return res.redirect("/");
};
