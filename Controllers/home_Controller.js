const Post = require("../models/post");
const User = require("../models/user");
// module.exports.home = function (req, res) {
// 	// Accessing a cookie Sent from the browser
// 	// console.log(req.cookies);
// 	// Changing the data of the cookie and
// 	//  sending it back to browser
// 	// res.cookie("user_id", "45");

// 	//////////////////////////////
// 	//Without Populating
// 	// Post.find({}, function (err, posts) {
// 	// 	return res.render("home", {
// 	// 		title: "Home",
// 	// 		posts: posts,
// 	// 	});
// 	// });
// 	// using the .populate
// 	Post.find({})
// 		.populate("user")
// 		.populate({
// 			path: "comments",
// 			populate: {
// 				path: "user",
// 			},
// 		})
// 		.exec(function (err, posts) {
// 			User.find({}, function (err, users) {
// 				return res.render("home", {
// 					title: "Home",
// 					posts: posts,
// 					all_users: users,
// 				});
// 			});
// 		});
// };

////////// converting the above code to async, await/////////////////////////////////

module.exports.home = async function (req, res) {
	try {
		let posts = await Post.find({})
			.populate("user")
			.populate({
				path: "comments",
				populate: {
					path: "user likes",
				},
			});

		let users = await User.find({});

		res.render("home", {
			title: "Home",
			posts: posts,
			all_users: users,
		});
	} catch (err) {
		console.log(`Error ${err}`);
	}
	return;
};
