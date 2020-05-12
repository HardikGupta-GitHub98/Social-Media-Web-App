const express = require("express");
const app = express();
const port = 8000;

// importing the router which is exported by routes //
const router = require("./routes");

// Middleware To use the above imported router from ////routes/index.js
app.use("/", router);

app.listen(port, function (err) {
	if (err) {
		console.log(`Error in Running The Server : ${err}`);
	} else {
		console.log(`Server Is Live At Port: ${port}`);
	}
	return;
});
