const express = require("express");
const router = express.Router();

const usersController = require("../Controllers/users_Controller");

/// The Path of the first Angument in .get function is relative to
//  the path mentioned in the first argument of Middleware where this module is called
// (in this case the middleware is present inside the index.js file of the routes)

// To handle "/Users" Request
router.get("/", function (req, res) {
	return res.end("<h1>All the Users</h1>");
});

// To handle the requests following "/Users"   eg="/Users/profile"
router.get("/profile", usersController.profile);

module.exports = router;
