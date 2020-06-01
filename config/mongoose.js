const mongoose = require("mongoose");
const environment = require("./environment");
mongoose.connect(`mongodb://localhost/${environment.db}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting To database"));

db.once("open", function () {
	console.log("Connected To MongoDB");
});

module.exports = db;
