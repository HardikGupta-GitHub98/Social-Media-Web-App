const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose.js");
// Importing express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

// Settting up the Assets Folder For Static Files
const assets = express.static("./assets");
app.use(assets);

// Middleware to use Layouts;
// It sholud be Imoprted Before Importing Routers
app.use(expressLayouts);

// Setting the Style tag and the Script Tags Of individual pages inside the head of the payout.ejs page
// This should be just below the app.use(expressLayouts)
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// importing the router which is exported by routes //
const router = require("./routes/index");

// Middleware To use the above imported router from ////routes/index.js
app.use("/", router);

// Setting Up the View Engine to  render the HTML page as response to a request
app.set("view engine", "ejs");
// to set the path for getting the HTML files from
app.set("views", "./views");

app.listen(port, function (err) {
	if (err) {
		console.log(`Error in Running The Server : ${err}`);
	} else {
		console.log(`Server Is Live At Port: ${port}`);
	}
	return;
});
