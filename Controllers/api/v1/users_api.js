const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
module.exports.createSession = async function (req, res) {
	let user = await User.findOne({ email: req.body.email });
	try {
		if (!user || user.password != req.body.password) {
			console.log("Invalid Username/Password");
			res.json(422, {
				message: "Invalid Username/Password",
			});
		} else {
			res.json(200, {
				message: "Sign In Successful ||| JWT token Generated",
				data: {
					token: jwt.sign(user.toJSON(), "WebApp", { expiresIn: "1000000" }),
				},
			});
		}
	} catch (err) {
		console.log("Error", err);
		res.json(500, {
			message: "Internal Server Error",
		});
	}
	return;
};
