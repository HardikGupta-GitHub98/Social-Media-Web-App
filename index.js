const express = require("express");
const app = express();
const port = 9000;

// importing the router which is exported by routes //
const router = require("./routes/index");

// Middleware To use the above imported router from ////routes/index.js
app.use("/", router);

app.listen(function (err) {
	if (err) {
		console.log(`Error in Running The Server : ${err}`);
	} else {
		console.log(`Server Is Live At Port: ${port}`);
	}
});
