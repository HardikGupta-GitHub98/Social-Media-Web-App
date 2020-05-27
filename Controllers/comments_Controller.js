const Post = require("../models/post");
const Comment = require("../models/comment");

// to send a mail to the user who commented //
const commentsMailer = require("../mailers/comments_mailer");

// module.exports.addComment = function (req, res) {
// 	Post.findById(req.body.postID, function (err, post) {
// 		if (err) {
// 			console.log(
// 				`Error In Finding The Post To Which The Comment Is Added ${err}`
// 			);
// 		} else if (!post) {
// 			console.log(`postID is Incorrect`);
// 		} else {
// 			Comment.create(
// 				{
// 					content: req.body.content,
// 					post: req.body.postID,
// 					user: req.user._id,
// 				},
// 				function (err, comment) {
// 					if (err) {
// 						console.log(`Erro In Creating New Comment IN DB  ${err}`);
// 					} else {
// 						post.comments.push(comment);
// 						post.save();
// 					}
// 				}
// 			);
// 		}
// 	});
// 	res.redirect("/");
// 	return;
// };

/////  Converting addComment To ASYNC AWAIT  ///////////////
module.exports.addComment = async function (req, res) {
	try {
		let post = await Post.findById(req.body.postID);
		if (post) {
			let comment = await Comment.create({
				content: req.body.content,
				post: req.body.postID,
				user: req.user._id,
			});
			post.comments.push(comment);
			post.save();
			// to send a mail to the user who commented //
			comment = await comment.populate("user", "name email").execPopulate();
			console.log(comment);

			commentsMailer.newComment(comment);
		} else {
			console.log(`postID is Incorrect`);
		}

		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
	return;
};

// module.exports.deleteComment = function (req, res) {
// 	Comment.findById(req.params.id, function (err, comment) {
// 		if (err) {
// 			console.log(`Error In Looking For Comment To delete It`);
// 		} else if (comment) {
// 			Post.findById(comment.post, function (err, post) {
// 				if (err) {
// 					console.log(
// 						`Error In FIndinf The Post Releted To the Comment ${err}`
// 					);
// 				} else {
// 					if (req.user.id == comment.user || req.user.id == post.user) {
// 						post.comments.splice(comment, 1);
// 						post.save();
// 						comment.remove();
// 					} else {
// 						console.log(`Not Authorised To Delete The Comment`);
// 					}
// 				}
// 			});
// 		} else {
// 			console.log(`Comment Does Not Exist In DB`);
// 		}
// 		res.redirect("/");
// 	});
// };

///// Converting Delete Comment TO Async Await //////////////

module.exports.deleteComment = async function (req, res) {
	try {
		let comment = await Comment.findById(req.params.id);
		if (comment) {
			let post = await Post.findById(comment.post);
			if (req.user.id == comment.user || req.user.id == post.user) {
				post.comments.splice(comment, 1);
				post.save();
				comment.remove();
			} else {
				console.log(`Not Authorised To Delete The Comment`);
			}
		} else {
			console.log(`Comment Does Not Exist In DB`);
		}
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
	return;
};
