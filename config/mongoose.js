const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/SocialApp_Development", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting To database"));

db.once("open", function () {
	console.log("Connected To MongoDB");
});

module.exports = db;
