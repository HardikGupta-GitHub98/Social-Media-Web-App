const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.addComment = function (req, res) {
	Post.findById(req.body.postID, function (err, post) {
		if (err) {
			console.log(
				`Error In Finding The Post To Which The Comment Is Added ${err}`
			);
		} else if (!post) {
			console.log(`postID is Incorrect`);
		} else {
			Comment.create(
				{
					content: req.body.content,
					post: req.body.postID,
					user: req.user._id,
				},
				function (err, comment) {
					if (err) {
						console.log(`Erro In Creating New Comment IN DB  ${err}`);
					} else {
						post.comments.push(comment);
						post.save();
					}
				}
			);
		}
	});
	res.redirect("/");
	return;
};
