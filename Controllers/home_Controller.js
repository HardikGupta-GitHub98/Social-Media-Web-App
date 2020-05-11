console.log("Home COntroller Called");

module.exports.home = function (req, res) {
	return res.send("<h1> Home Controller Exporting! </h1>");
};
