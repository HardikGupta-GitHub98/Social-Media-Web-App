const Post = require("../models/post");

module.exports.create = function (req, res) {
	// if (req.isAuthenticated()) {
	Post.create(
		{
			content: req.body.content,
			user: req.user._id,
		},
		function (err, post) {
			if (err) {
				console.log(`Error In Storing The Post ${err}`);
			} else {
				res.redirect("/");
			}
			return;
		}
	);
	// } else {
	// 	console.log(`You Are Not Singed In`);

	// 	res.redirect("/users/user-sign-in");
	// }
};
