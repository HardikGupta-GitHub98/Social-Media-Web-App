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
