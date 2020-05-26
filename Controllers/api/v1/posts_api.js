const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
	let posts = await Post.find({})
		.populate("user")
		.populate({
			path: "comments",
			populate: {
				path: "user",
			},
		});

	res.json(200, {
		message: "List Of Posts",
		posts: posts,
	});
};

// To delete a post
//  this Function is not restricted by authorisation for now
module.exports.deletePost = async function (req, res) {
	try {
		let post = await Post.findById(req.params.id);
		if (post) {
			post.remove();
			await Comment.deleteMany({ post: post._id });
			res.json(200, {
				message: "Post Ans Related Comments Deleted Successfully",
			});
		}
	} catch (err) {
		res.json(500, {
			message: "Internal server Error",
		});
	}
	return;
};
