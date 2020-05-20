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

module.exports.deleteComment = function (req, res) {
	Comment.findById(req.params.id, function (err, comment) {
		if (err) {
			console.log(`Error In Looking For Comment To delete It`);
		} else if (comment) {
			Post.findById(comment.post, function (err, post) {
				if (err) {
					console.log(
						`Error In FIndinf The Post Releted To the Comment ${err}`
					);
				} else {
					if (req.user.id == comment.user || req.user.id == post.user) {
						post.comments.splice(comment, 1);
						post.save();
						comment.remove();
					} else {
						console.log(`Not Authorised To Delete The Comment`);
					}
				}
			});
		} else {
			console.log(`Comment Does Not Exist In DB`);
		}
		res.redirect("/");
	});
};
