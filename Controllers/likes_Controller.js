const Like = require("../models/likes");
const Comment = require("../models/comment");
const Post = require("../models/post");
// Structure of the request will be a query type not params
//  8000/toggle/?id=wogn&type=Post/Comment
module.exports.toggleLike = async function (req, res) {
	try {
		// To know what is liked ie a post or a comment
		let likeable;
		// to tell the front end whether the post is liked or disliked
		// boolean
		let deleted;
		if (req.query.type == Post) {
			likeable = await Post.findById(req.query.id).populated("likes");
		} else {
			likeable = await Post.findById(req.query.id).populated("likes");
		}
		//find if the user has already liked the likeable or not
		let existingLike = await Like.findOne({
			likeable: req.query.id,
			onModel: req.query.type,
			user: req.user._id,
		});
		if (existingLike) {
			// to delete the already existing like
			deleted = true;
			likeable.likes.pull(existingLike._id);
			likeable.save();
		} else {
			// make a new like in the DB
			let newLIke = await Like.create({
				user: req.user.id,
				likeable: req.query.id,
				onModel: req.query.type,
			});
			likeable.likes.push(like._id);
			likeable.save();
		}
	} catch (err) {
		console.log("Internal Server Error", err);
	}
	return res.json(200, {
		message: "request Successfull",
		data: {
			delete: deleted,
		},
	});
};
