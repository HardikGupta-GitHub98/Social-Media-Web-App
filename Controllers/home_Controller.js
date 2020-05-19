const Post = require("../models/post");

module.exports.home = function (req, res) {
	// Accessing a cookie Sent from the browser
	// console.log(req.cookies);
	// Changing the data of the cookie and
	//  sending it back to browser
	// res.cookie("user_id", "45");

	//////////////////////////////
	//Without Populating
	// Post.find({}, function (err, posts) {
	// 	return res.render("home", {
	// 		title: "Home",
	// 		posts: posts,
	// 	});
	// });
	// using the .populate
	Post.find({})
		.populate("user")
		.exec(function (err, posts) {
			return res.render("home", {
				title: "Home",
				posts: posts,
			});
		});
};
