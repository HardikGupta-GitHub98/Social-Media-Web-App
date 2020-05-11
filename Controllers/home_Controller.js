console.log("Home COntroller Called");

module.exports.home = function (req, res) {
	return res.end("<h1> Home Controller Exporting! </h1>");
};
