const express = require("express");
const app = express();
const port = 8000;

app.listen(function (err) {
	if (err) {
		console.log(`Error in Running The Server : ${err}`);
	} else {
		console.log(`Server Is Live At Port: ${port}`);
	}
});
