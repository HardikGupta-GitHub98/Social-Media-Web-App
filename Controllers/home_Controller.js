module.exports.home = function (req, res) {
	// Accessing a cookie Sent from the browser
	console.log(req.cookies);
	// Changing the data of the cookie and
	//  sending it back to browser
	res.cookie("user_id", "45");

	return res.render("home", {
		title: "Home",
	});
};
