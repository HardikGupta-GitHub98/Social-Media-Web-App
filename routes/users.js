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
// To Render Form To Sign In For An Existing User
router.get("/user-sign-in", usersController.user_sign_in);
//  To Render SignUp Form
router.get("/user-sign-up", usersController.user_sign_up);
// To Create A user In The DataBase
router.post("/createUser", usersController.create);
// To Get Information Of a User
router.post("/createSession", usersController.createSession);

module.exports = router;
