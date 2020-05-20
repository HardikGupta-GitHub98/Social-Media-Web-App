const Post = require("../models/post");
const Comment = require("../models/comment");
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
module.exports.deletePost = function (req, res) {
	Post.findById(req.params.id, function (err, post) {
		if (err) {
			console.log(`Error In Looking For The Post To Delete It`);
		} else if (post) {
			if (post.user == req.user.id) {
				post.remove();
				Comment.deleteMany({ post: post._id }, function (err) {});
			} else {
				console.log(`You Are Not Authorised To Delete The Post`);
			}
		} else {
			console.log(`Post Not Found`);
		}
		return res.redirect("back");
	});
};
