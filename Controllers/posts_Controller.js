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
				req.flash("error", err);
				console.log(`Error In Storing The Post ${err}`);
			} else {
				// After Converting the post request into AJAX
				if (req.xhr) {
					req.flash("success", "Posted Created Successfully");
					res.status(200).json({
						data: {
							post: post,
						},
						message: "Post Created",
					});
				}

				// res.redirect("/");    // This Was Before Converting Into The AJAX//
			}
			return;
		}
	);
	// } else {
	// 	console.log(`You Are Not Singed In`);

	// 	res.redirect("/users/user-sign-in");
	// }
};

// module.exports.deletePost = function (req, res) {
// 	Post.findById(req.params.id, function (err, post) {
// 		if (err) {
// 			req.flash("error", err);
// 			console.log(`Error In Looking For The Post To Delete It`);
// 		} else if (post) {
// 			if (post.user == req.user.id) {
// 				post.remove();
// 				Comment.deleteMany({ post: post._id }, function (err) {});
// 				req.flash("success", "Post And Related Comments Deleted");
// 			} else {
// 				req.flash("error", `You Are Not Authorised To Delete The Post`);
// 				console.log(`You Are Not Authorised To Delete The Post`);
// 			}
// 		} else {
// 			req.flash("error", `Post Not Found`);
// 			console.log(`Post Not Found`);
// 		}
// 		return res.redirect("back");
// 	});
// };

//////////// Converting DeletePost TO ASYNC AWAIT ; ///////////////////////////////////

module.exports.deletePost = async function (req, res) {
	try {
		let post = await Post.findById(req.params.id);
		if (post) {
			if (post.user == req.user.id) {
				post.remove();
				await Comment.deleteMany({ post: post._id });
				req.flash("success", "Post And Related Comments Deleted");
			} else {
				req.flash("error", `You Are Not Authorised To Delete The Post`);
				console.log(`You Are Not Authorised To Delete The Post`);
			}
		} else {
			req.flash("error", `Post Not Found`);
			console.log(`Post Not Found`);
		}
		res.redirect("back");
	} catch (err) {
		console.log("Error", err);
	}
	return;
};
